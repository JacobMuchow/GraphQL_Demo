# GraphQL Demo

The main purpose of this little app was to research GraphQL and demonstrate how it could work in a full-stack application. I spent quite a bit of time researching GraphQL and trying to create an architure that I thought make sense for the framework. Additionally, I was learning how Heroku and Node.JS worked, so please look past the limited features and simplistic UI. I could have easily just created a LAMP stack, but I decided to really challenge myself with this project. I think this is really cool stuff!

## GraphQL

GraphQL is a new type of API (circa 2015) created by developers at Facebook. GraphQL APIs have one endpoint for which backend developers create a "query langauge" that defines  a JSON-like structure which requesters can use to define _exactly_ what data they want to get back from the server.

For example, I might query for a list of baseball stadiuims and specify that I want ids, locations, and names of each baseball stadium (although I could request more fields if I wanted). This is really usefull because it shifts a lot of the responsibility of structuring data to the clients. Each client can do what it needs to fit its own needs. As a mobile app developer on the side, I know how RESTful APIs can end up getting in the way with big teams. To make an efficiency changes, the backend team has to communicate with the client team(s), and it just takes that much longer. GraphQL removes much of these problems.

### Example 

Query:
```
query {
    listFestivals {
        id, name, description,
        events {
            id
        }
    }
}
```

Response:
```
{
  "data": {
    "listFestivals": [
      {
        "id": "1",
        "name": "Roots N Blues N BBQ Festival",
        "description": "Annual Roots N Blues festival in Columbia, MO",
        "events": [
          {
            "id": "1"
          },
          {
            "id": "2"
          }
        ]
      }
    ]
  }
}
```

If I so wanted, I could request more fields for festivals or events, provided they are defined by the query language set up on the backend. This is particularly powerful in 2nd world countries where many cellular networks are still 3G or 2G. As a matter of fact, Facebook developed GraphQL specifically for the purpose of making their network requests faster in order to produce a more response app in these countries.

## The Demo

In this demo application, there are festivals, events, and artists. The idea is that indie music festivals (akin to RootsNBlues if you are familiar) can register for this service and have their festival schedule be available on an application for users. You can create festivals, events, artists, and search for artists to play in events. You can also delete festivals. The features are pretty limited at the moment, but my focus on developing the API. I set it up intentionally so that I could add features quickly on the backend. I found my main hinderance was actuallyt HTML/CSS, not any GraphQL code once I got it figured out. I was able to make new endpoints in perhaps a minute!

## Thank you!