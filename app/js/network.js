function listFestivals() {
    return makeAPIQuery("{listFestivals{id,name,description}}");
}

function getFestival(festivalId) {

    var query = `{
        getFestival(id: ${festivalId}) {
            id, name, description, 
            events {
                id, event_time, description,
                artist {
                    id, name, description
                }
            }
        }
    }`;

    return makeAPIQuery(query);;
}

function createFestival({name, description}) {

    var query = `mutation {
        createFestival(name: "${name}", description: "${description}") {
            id, name, description
        }
    }`;

    return makeAPIQuery(query);
}

function makeAPIQuery(query) {
    var payload = {
        query: query
    };

    return $.ajax({
        url: "/api/graphql",
        method: "POST",
        data: payload
    });
}