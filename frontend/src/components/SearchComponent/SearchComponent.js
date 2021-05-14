import { Form, Accordion, Button, Container, Row, Col } from 'react-bootstrap';
import './SearchComponent.css';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import fileUpload from '../../NetworkRequests/UploadFile';
import InitiateSearch from '../../NetworkRequests/InitiateSearch';
import Logout from '../../NetworkRequests/Logout';
import TotalDatasetsCount from '../../NetworkRequests/TotalDatasetsCount';
import FuzzyPrefixMatchComponents from './FuzzyPrefixMatchComponents';
import ExactSearchComponent from './ExactSearchComponent';

const SearchComponent = () => {
    const uploadFile = async () => {
        if (!selectedFile) return;
        const formData = new FormData();
        formData.append(
            "fileUpload",
            selectedFile,
            selectedFile.name,
        );
        let status = await fileUpload(formData);
        if (status === 200) alert('Uploaded successfully!');
        await fetchAllDataSetsCount();
    }

    const [selectedFile, setSelectedFile] = useState("");
    const [keyString, setKeyString] = useState('');
    const [searchResults, setSearchResults] = useState({});
    const [totalDatasets, setTotalDataSets] = useState(0);
    const [datasetNames, setDatasetNames] = useState(0);

    const fetchAllDataSetsCount = async () => {
        const { count, dataSetNames } = await TotalDatasetsCount();
        setTotalDataSets(count);
        setDatasetNames(dataSetNames)
    }
    useEffect(async () => {
        await fetchAllDataSetsCount();

    }, [totalDatasets]);

    const handleOnChange = async (value) => {
        setSearchResults({});
        //  We got to make a request... 
        setKeyString(value);
        // Request for possible matches.
        let results = await InitiateSearch(value);
        setSearchResults(results);
    }

    const performLogout = async () => {
        await Logout();
    }

    return <div className="searchComponent">
        <div className="header-and-navigations">
            <div className="go-home">
                <Button><Link to='/'>Home </Link></Button>
            </div>
            <header>
                You can add in your dataset or search for a text, across all of your datasets really really quickly.
        </header>
            <div className="logout">
                <Button onClick={(e) => performLogout()}> Logout </Button>
            </div>
        </div>

        <div className="search-and-upload">
            <div className="fileUploader">
                <Container>
                    <Row>
                        <Col>
                            <Accordion defaultActiveKey="1">
                                <div className="dataSetParent">
                                    <Accordion.Toggle as={Button} eventKey="0">
                                        Upload Data set
                                    </Accordion.Toggle>
                                    <div className="totalDatasets">
                                        <p>{`Total Datasets uploaded: ${totalDatasets}`}</p>
                                        <p>{`${Array.from(datasetNames).join(',')}`}</p>
                                    </div>
                                </div>
                                <Accordion.Collapse eventKey="0">
                                    <div className="upload-arena">
                                        <p className="upload-text-helper">
                                            Upload a new CSV dataset here 👇
                            </p>
                                        <Form >
                                            <Form.Group >
                                                <Form.File id="fileUpload"
                                                    // label={selectedFile && selectedFile.name}
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
                        </Col>
                    </Row>
                </Container>
            </div>
            {/* File uploader ends here */}
            {/* Search pane */}
            <div className="search-arena">
                <Container>
                    <Row>
                        <Col>
                            <Form className="inputForm">
                                <Form.Group>
                                    <Form.Label>Search</Form.Label>
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
            <Container>
                <Row>
                    <Col>
                        <div className="searchResults">
                            <div className="exactMatchComponent">
                                <ExactSearchComponent
                                    searchResults={searchResults}
                                    keyString={keyString}
                                />
                            </div>

                            <div className="prefixMatches">
                                <FuzzyPrefixMatchComponents
                                    searchResults={searchResults}
                                    searchType={'prefix'}
                                />
                            </div>

                            <div className="fuzzyMatches">
                                <FuzzyPrefixMatchComponents
                                    searchResults={searchResults}
                                    searchType={'fuzzy'}
                                />
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    </div>;
}

export default SearchComponent;