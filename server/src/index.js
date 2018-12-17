const { GraphQLServer } = require('graphql-yoga')

// 1
let links = [{
  id: 'link-0',
  url: 'www.howtographql.com',
  description: 'Fullstack tutorial for GraphQL'
}]

let idCount = links.length
const resolvers = {
  Query: {
    info: () => `This is the API of a Hackernews Clone`,
    // 2
    feed: () => links,
    link: (root, args) => {
      console.log(args);
      for (let i = 0; i < links.length; i++) {
        if (links[i].id === args.id) {
          return links[i];
        }
      }
      return null;
    }
  },
  Mutation: {
    // 2
    post: (root, args) => {
       const link = {
        id: `link-${idCount++}`,
        description: args.description,
        url: args.url,
      }
      links.push(link)
      return link
    },
    updateLink: (root, args) => {
      for (let i = 0; i < links.length; i++) {
        if (links[i].id === args.id) {
          links[i].url = args.url || links[i].url;
          links[i].description = args.description || links[i].description;
          return links[i];
        }
      }
      return null;
    },
    deleteLink: (root, args) => {
      for (let i = 0; i < links.length; i++) {
        if (links[i].id === args.id) {
          let linkToRet = links[i];
          links.splice(i, 1);
          return linkToRet;
        }
      }
      return null;
    }
  }
}

// 3
const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
})
server.start(() => console.log(`Server is running on http://localhost:4000`))
