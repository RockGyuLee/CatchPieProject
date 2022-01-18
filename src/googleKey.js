import React from "react";

export const API_KEY = 'AIzaSyBH6ffFWEaWhwepRWsl4GliqWKiNfbbvlU';
export const API_URL = `https://vision.googleapis.com/v1/images:annotate?key=${API_KEY}`;


export const fetchBody = (image) => {
  return {
      requests: [
        {
          image: {
            content: image,
          },
          features: [
            { 
              type: 'TEXT_DETECTION', 
              maxResults: 5 
            },
          ],
        },
      ],
    };
}

export const googleFetch = async (imagePath) => {
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(fetchBody(imagePath)),
    });
    return await res.json();
  
}

export const jsonPostfetch = (url, paramJson, defaultData, abortController) => {
  const realUrl = urlPrefix + url;
  return fetch(realUrl, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(paramJson),
      signal: abortController && abortController.signal
  })
    .then(handleResponse(realUrl, paramJson, defaultData))
    .catch(err => {
        console.error(err.code, err.message);
        //location.href = '/login.html'
    })
}