<!-- 
Author: Mohamed Fazaary A S
Associate Consultant @ Servian
 -->

 # What? 
This is an implementation of RediSearch leveraging Exact Match, Prefix based searching and Fuzzy search features

# Why do we need this app? 
A lot of times, we need to search keyWords in our dataset. It is super hard to go through each dataset when we exactly don't remember where they keyWord and data that we search for resides.

Our Dataset also contains different Column lengths, which makes it very hard if not impossible to execute a single search across all datasets and retrieve all possible keyword matches [Fuzzy, Prefix or Exact Matches] from all of those dataset without crashing our code editor or stalling our UI.

This project gives a portal where we can manage our datasets and execute searches across all of those datasets and provides a one-stop platform

# How does this app work, functionally? 
All you need to do as a user is to upload your Dataset. Within seconds, you are good to execute your search.
You can also keep adding datasets and *non-duplicated* search results will be available on request.

# Which datasets are supported? 
At the moment, we only support CSV datasets. It is preferred to upload a CSV that has headers.

# How does this app works, Technically?
Once you upload a CSV Dataset, it is then goes through post-processing. This includes 

* You create a new user. - This is stored in Redis Cache. For convenience, A user is created at the time of starting this app to get a head start of this boring process.
* Login to application - If the credentials match, a jwt token is created and maintained in Redis using jwt-redis package.
* User uploads a CSV dataset.
* Once the upload is completed and stored in datasource/ of this app, next steps such as creating the indexes for every column of the dataset using [hset] and 
  [FT.CREATE] is performed- Helps with Exact Word matches
* Creates a suggestion dictionary for every row in the dataset - Helps with Fuzzy and Prefix based searching [FT.SUGADD]
* Within seconds of uploading the dataset, all keys are indexed and suggestion dictionaries are populated and notifies the user in the frontend.
* The user in the frontend dispatches a request to obtain search results.
* Every keyString is then processed against [FT.SEARCH], [FT.SUGGET] and [FT.SUGGET,FUZZY] commands and finally a payload is then sent to frontend for the user to visualize.
* Matching key-string in the payload is highlighted to the user to better locate their search text.

# Spin up Environment
 - This app requires you install Docker and Git
 - Clone the repository
   git clone https://github.com/Fazaarycode/Redis-Hackathon-2021-Apr-May.git
 - Change Directory: cd Redis-Hackathon-2021-Apr-May/
 - *Run* docker-compose up 
 - Once docker containers have spun up, You should have frontend running on http://localhost:3000/
 - Backend running http://localhost:4000/
 - A user is already created for you.
 - Click on Login in the home page and pass
   * email: user@runtimeterror.com
   * password: 123
- You should now be able to Access the search page where you can upload CSV dataset and begin searching!
- For any questions, watch the video from the URL linked to this README.md

# Technologies Used
* ReactJS
* NodeJS
* Docker containerization
* RediSearch
   - Commands
     - FT.SEARCH
     - FT.CREATE
     - FT.DROPINDEX
     - FT.SUGADD
     - FT.SUGGET
     - SET
     - GET
* Redis Cache
* A few npm packages


# This is a complete implementation from scratch. Hope you like it! 
# If you have any questions, comments, recommendations, jobs, or partnership with Servian, let me know through the email we registered. 
# Have a good day, Stay safe.

