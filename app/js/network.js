/**
 * This is my networking layer, if you will, for the client application.
 * makeAPIQuery() makes an async POST request using JQuery to the graphql
 * API with the query given.
 * 
 * I created functions for each enpoint to keep my page files neat.
 * If I added any more endpoints, I would probably have to rethink how 
 * this is structured. I got into the architecture a little more with 
 * GraphQL, but that is what I was most interested in for this project. 
 * The frontend stuff is mostly a demo.
 */
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

function deleteFestival(festivalId) {
    var query = `mutation {
        deleteFestival(id: ${festivalId}) {
            id
        }
    }`
    return makeAPIQuery(query);
}

function getArtist(artistId) {
    var query = `{
        getArtist(id: ${artistId}) {
            id, name, description
        }
    }`;
    return makeAPIQuery(query);
}

function artistSearch(name) {
    var query = `{
        artistSearch(name: "${name}") {
            id, name, description
        }
    }`;
    return makeAPIQuery(query);
}

function createArtist({name, description}) {
    var query = `mutation {
        createArtist(name: "${name}", description: "${description}") {
            id, name, description
        }
    }`;
    return makeAPIQuery(query);
}

function createEvent({festivalId, artistId, description, event_time}) {
    var query = `mutation {
        createEvent(festivalId: ${festivalId}, artistId: ${artistId}, description: "${description}", event_time: "${event_time}") {
            id
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