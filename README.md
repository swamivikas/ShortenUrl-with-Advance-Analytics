# ShortenUrl-with-Advance-Analytics
this is a shorten url project with advacnce analytics 

# Features 

### Shorten long URLs
### Custom short codes
### Expiration dates for URLs
### Redirect short URLs to original URLs
### Track visits and provide analytics (total visits, unique visitors, device types, time series data)

# Prerequisites

### Node.js (>= v14.x)
### MongoDB (>= v4.x)
### npm (>= v6.x)

# Installation
#### Clone the repository:
     
       git clone https://github.com/yourusername/url-shortener.git
       cd url-shortener
     

#### Install dependencies:
   
    npm install
  
#### Add you MongoDB Connection string in App.js as shown in image 

  ![image](https://github.com/swamivikas/ShortenUrl-with-Advance-Analytics/assets/108607735/f8b5cac3-1c6a-4984-82a5-b287ed9db33c)

#### To Run the project 

    npm start

# Usages

### 1. Shorten URL 
#### Request  -> POST
#### Endpoint -> /api/shorten
#### Request Body ->  
![image](https://github.com/swamivikas/ShortenUrl-with-Advance-Analytics/assets/108607735/bdf5f8e7-8059-4541-9647-f81c8267a8d0)

#### You will recieve an output like this 
![image](https://github.com/swamivikas/ShortenUrl-with-Advance-Analytics/assets/108607735/05b83794-e5f4-4728-a4f6-e374ed9c50f3)


### 2. Redirect URL
#### Request  -> GET
#### Endpoint -> /api/:{SHORTCODE NAME}
#### when you hit this request on browser it will redirect to the original and open the website 


### 1. Get Analytics 
#### Request  -> GET
#### Endpoint -> /api/analytics/:{SHORTCODE NAME}
#### Request Body ->  
   ![image](https://github.com/swamivikas/ShortenUrl-with-Advance-Analytics/assets/108607735/aa5c6826-8cfe-4650-9729-95d68c6986e6)


#### You will recieve an output like this 
   ![image](https://github.com/swamivikas/ShortenUrl-with-Advance-Analytics/assets/108607735/a99d6929-4bf8-4075-87bb-01137474ff12)



