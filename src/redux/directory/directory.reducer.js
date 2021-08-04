const INITIAL_STATE = {
    sections: [
        {
        title: 'hats',
        imageUrl: 'https://images.unsplash.com/photo-1537196331794-fa2fd8bb024b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80',
        id: 1,
        linkUrl: 'shop/hats'
        },
        {
        title: 'jackets',
        imageUrl: 'https://images.unsplash.com/photo-1521223890158-f9f7c3d5d504?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=628&q=80',
        id: 2,
        linkUrl: 'shop/jackets'
        },
        {
        title: 'sneakers',
        imageUrl: 'https://images.unsplash.com/photo-1528669631894-8dbd0935e091?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=700&q=80',
        id: 3,
        linkUrl: 'shop/sneakers'
        },
        {
        title: 'womens',
        imageUrl: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
        size: 'large',
        id: 4,
        linkUrl: 'shop/womens'
        },
        {
        title: 'mens',
        imageUrl: 'https://images.unsplash.com/photo-1584486483122-af7d49cf2992?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80',
        size: 'large',
        id: 5,
        linkUrl: 'shop/mens'
        }
    ]
}

const directoryReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        default:
            return state;
    }
}

export default directoryReducer;

/*
original image urls
https://i.ibb.co/R70vBrQ/men.png
https://i.ibb.co/GCCdy8t/womens.png
https://i.ibb.co/0jqHpnp/sneakers.png
https://i.ibb.co/px2tCc3/jackets.png
https://i.ibb.co/cvpntL1/hats.png
*/
