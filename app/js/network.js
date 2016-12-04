function listFestivals() {
    return makeAPIQuery("{listFestivals{id,name,description}}");
}

function getFestival(festivalId) {
    return makeAPIQuery("{getFestival(id: " + festivalId + "){id, name, description, events{id, event_time, description, artist{id, name, description}}}}");
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