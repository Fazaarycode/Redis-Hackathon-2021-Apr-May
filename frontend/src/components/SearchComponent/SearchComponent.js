import { Form, Accordion, Button, Container, Row, Col } from 'react-bootstrap';
import './SearchComponent.css';
import React, { useState } from 'react';

import fileUpload from '../../NetworkRequests/UploadFile';
import InitiateSearch from '../../NetworkRequests/InitiateSearch';
import ExactSearchInteratorComponent from './ExactSearchIteratorComponent';

const SearchComponent = () => {

    const uploadFile = async () => {
        const formData = new FormData();
        formData.append(
            "fileUpload",
            selectedFile,
            selectedFile.name,
        );
        let status = await fileUpload(formData);
        if (status === 200) alert('Uploaded successfully!')
    }

    const [selectedFile, setSelectedFile] = useState("");
    const [keyString, setKeyString] = useState('');
    const [searchResults, setSearchResults] = useState({});

    const handleOnChange = async (value) => {
        setSearchResults({});
        //  We got to make a request... 
        setKeyString(value);
        // console.log(InitiateSearch(value))
        // Request for possible matches.
        let results = await InitiateSearch(value);
        setSearchResults(results);
    }

    return <div className="searchComponent">
        <header>
            You can add in your dataset or search for a text, across all of your datasets really really quickly.
        </header>
        <div className="search-and-upload">
            <div className="fileUploader">
                <Accordion defaultActiveKey="1">
                    <Accordion.Toggle as={Button} eventKey="0">
                        Upload Data set
                    </Accordion.Toggle>

                    <Accordion.Collapse eventKey="0">
                        <div className="upload-arena">
                            <p className="upload-text-helper">
                                Upload a new CSV dataset here 👇
                            </p>
                            <Form >
                                <Form.Group >
                                    <Form.File id="fileUpload"
                                        label={selectedFile && selectedFile.name}
                                        className="fileUpload"
                                        onChange={(e) => setSelectedFile(e.target.files[0])}
                                    />
                                </Form.Group>
                            </Form>
                            <div className="confirmUpload">
                                <Button variant="primary" onClick={() => uploadFile()}>Confirm upload</Button>

                            </div>
                        </div>
                    </Accordion.Collapse>
                </Accordion>
            </div>
            {/* File uploader ends here */}
            {/* Search pane */}
            <div className="search-arena">
                <Container>
                    <Row>
                        <Col>
                            <Form>
                                <Form.Group>
                                    <Form.Label>Type text...</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="name"
                                        value={keyString}
                                        onChange={(e) => handleOnChange(e.target.value)}
                                        placeholder="Search Text"
                                        required
                                    />
                                </Form.Group>
                            </Form>
                        </Col>
                    </Row>
                </Container>
            </div>
            {/* Search Results */}
            <div className="searchResults">
                <p> Exact Word Matches</p>
                {/* <p> Exact Word Matches { JSON.stringify(searchResults)}</p> */}
                {
                    searchResults && searchResults.data && searchResults.data['exactSingleWordMatch']
                    && Object.entries(searchResults.data['exactSingleWordMatch'])
                        .map(([k, v]) => {
                            return <div>
                                <p> {`Dataset Name: ${k}`}</p>
                                {
                                    v[0] && v[0].count !== 0 ?
                                        <p>{`Total Occurrences ${v[0].count}`}</p>
                                        : null
                                }
                                <p> Matching Payloads </p>
                                {
                                 v[0] && v[0].allValues 
                                 ?
                                 v[0].allValues.map(eachValue => {
                                    return <ExactSearchInteratorComponent 
                                    eachValue = {eachValue}
                                    keyString={keyString}
                                    />
                                 })
                                 : null
                                }
                            </div>
                        })
                }
            </div>
        </div>
    </div>;
}

export default SearchComponent;