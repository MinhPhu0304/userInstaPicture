module.exports = async function (context, req) {

    const axios = require('axios')
    if (req.query.user || (req.body && req.body.name)) {

        const instaUserData = await axios.get(`https://www.instagram.com/${req.query.user}/?__a=1`)
        
        const userMedia = instaUserData.data.graphql.user.edge_owner_to_timeline_media.edges
        let userMediaImage = [];
        
        userMedia.forEach(({ node }) => {
            userMediaImage.push(node.display_url)
        })

        let result = {};
        result.data = userMediaImage;
        context.res = {
            // status: 200, /* Defaults to 200 */            
            body: result
        };
    }
    else {
        context.res = {
            status: 400,
            body: "Please pass a name on the query string or in the request body"
        };
    }
};