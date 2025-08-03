import { production, port } from './constants/env.constant.js';

const apiDocs = production
  ? 'https://melodayzmusic-api.onrender.com/api/docs'
  : `http://localhost:${port}/api/docs`;

export const landingPage = `
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>MelodayzMusic</title>
    <style>
    #container {
        flex-shrink: 0;
        margin-top: 60px;
        width: 90%;
        display: flex;
        flex-direction: column;
        align-items: start;
        color: white;
        border: 1px solid rgb(224, 224, 224);
    }

    @media (min-width: 768px) { /* Desktop (start with 768px) */
        #container {
        width: 50%;
        }
    }

    .box {
      flex-grow: 1;
      height: 100vh !important;
      border: 1px solid rgb(224, 224, 224);
    }
    </style>
</head>
<body style="padding: 0; margin: 0; background: rgb(3, 3, 12); 
    font-family: 'Inter', sans-serif; display: flex; 
    justify-content: center; align-items: start">
    <div class="box"></div>
    <div id="container">
    <h1 style="margin-top: 0; padding: 0">Welcome to MelodayzMusic API</h1>
    <p>
        <span style="color: #00BFFF">MelodayzMusic</span>
        is a web application designed to provide an engaging and
        seamless music experience for users.
    </p>
    <h3 style="padding: 0; margin: 2px">Features:</h3>
    <p style="margin: 0">
    <ol style="color: rgb(224, 224, 224)">
        <li>Stream and discover music.</li>
        <li>Create and manage playlists.</li>
        <li>User-friendly interface.</li>
        <li>Responsive design for all devices.</li>
        <li>Challenge mode for music enthusiasts.</li>
        <li>API independent backend for flexibility.</li>
        <li>Built with modern technologies like Bun, React, and
        Node.js.</li>
        <li>Supports both frontend and backend development.</li>
        <li>Uses Bun for dependency management.</li>
    </ol>
    </p>
    <button
        style="all: unset; background: #00BFFF; font-weight: 700; 
        padding: 10px 15px; border-radius: 2.5px; cursor: pointer;"
    >
        <a style="all: unset" target="_blank" href=${apiDocs} >API Docs</a>
    </button>
    </div>
    <div class="box"></div>
</body>
</html>
`;
