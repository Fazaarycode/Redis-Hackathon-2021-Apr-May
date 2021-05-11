// This is a helper to make a request for every keyString supplied.

const InitiateSearch = async keyString => {
    let response = await fetch(`http://localhost:4000/auto-complete-results?keyString=${keyString}`);
    let data = await response.json();
    return data;
}

export default InitiateSearch;