# Pong
Live 2 player ping-pong 

You can try it out at: [ping.pong.hajek.live](http://ping.pong.hajek.live)

## Technologies Used
- **React**: A JavaScript library for building user interfaces
- **Socket.io**: Enables real-time, bidirectional communication between web clients and servers
- **Express**: A minimal and flexible Node.js web application framework
- **Gatsby**: A React-based open-source framework for creating fast static websites

## Steps to Run the Project

1. **Set Up Environment Variables**
   - In the `express` folder, copy `example.env` to `.env`
   - In the `gatsby` folder, copy `example.env` to `.env.development` or `.env.production`

2. **Build the Gatsby Project**
   - Navigate to the `gatsby` folder.
   - Run `gatsby build` to create the `public` folder. This folder will contain the static files for the Gatsby site.
   
3. **Host the Public Folder**
   - Host the `public` folder on your web server of choice.

4. **Start the Express Server**
   - Navigate to the `express` folder.
   - Run `node server.js` to start the Express server.
