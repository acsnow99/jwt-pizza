
# Curiosity Report: DataDog
DataDog is a program that is used to find errors in the program that I work on at work. I have been curious since I started working there what DataDog does and how to interact with it. My permissions are messed up at work so I haven't had the chance to mess around with it during work hours. Now is the time to try it out. I will see if I can set up DataDog to interact with JWT-pizza.

## Initial Research
I ran into DataDog when I was doing some research into other apps that are similar to Grafana. I had never used Grafana before this class and I thought it was so helpful for an app that is constantly active. So I was thinking: are there other pieces of software that help me understand how my app is running, so that I can get a nuanced view of the app and its health? 

### SRE
The first thing that came up when I googled my question was an acronym called SRE: Site Reliability Engineering. Apparently, some companies have engineers whose job is just to increase the observability of the app and maintain its availability across software updates. Site Reliability Engineers can also be in charge of making incident response plans. 

### DataDog Basics
Next, I did research into DataDog. The main question on my mind was: what makes DataDog different from Grafana? The purpose of each seemed the same. 

Looking over their "product" pages, it seemed that DataDog has a much more extensive set of third-party integrations. 

Grafana has some integrations, but compared to DataDog they are quite bare-bones. 

Additionally, DataDog has a lot of fancy features like Metric-log Correlation. This has been on my wishlist for Grafana features, and although I'm pretty sure it's possible to make it work in Grafana, DataDog has a feature where you can view the metrics at the exact time of a log message without any setup.

The nice thing about DataDog is that it also supports instrumenting code like we did for JWT Pizza.

## Trying out DataDog
### Creating an account
To access the DataDog software I had to create an account. I signed up and viewed the many platform options, including Docker, Windows, Mac, and specific Linux operating systems like Debian and Ubuntu. 

There was even a Lambda option, which makes me even more curious. For today, I will just use the Windows version. 

### Installing the agent
DataDog uses something called "agents", which are pretty much instances of a software that sends metrics to DataDog. It seems like DataDog manages the servers and it is not possible to host your own server. Instead, you put the agent on any machine or lambda or cloud resource that needs to be monitored(including dev machines) and then the results are available from the DataDog website. 

I installed an agent using Powershell and then observed a graph on the DataDog page that showed my infrastructure, which at this point only includes my local computer.

### Making Dashboards

Being presented with a blank page and no idea what to do next, I followed my Grafana instincts and created a new Dashboard.

Dashboards work largely the same way as in Grafana: you pick a type of graph, the metric to display, the source, tags to match, and optionally apply a function (average, sum) to the values.

### Integrating with JWT Pizza
Things got super interesting when I began the process of integrating DataDog into JWT Pizza. I chose a simple example to work with: counting visits to the docs page. 

I opened the integrations page, which is highlighted near the bottom of the DataDog page, and searched for NodeJS, which I saw during setup. The instructions were incredibly simple. All it asks you to do is install a single package and then call methods on a singleton to send metrics. 

I added a call to the increment method from within the /docs endpoint handler and metrics immediately showed up on the site under the name I provided. 

This is generally simpler than our Grafana solution, since the codebase doesn't need to be set up to make queries to the metrics platform, instead it just uses a package, similar to how our pizza-logger package works. Additionally, summing counts doesn't require tracking counts through a class, instead you use a different method to increment the count. Things are much simpler with this package, since every call to send a metric only requires the name of the metric. 

Although, DataDog does require more initial setup for each machine that the metrics need to be collected on. I'm sure we could figure out how to do that for JWT Pizza by changing our automation pipeline to also initialize a DataDog agent. Installation is simple, we would just have to include our API key and site URL as secrets on setup, probably during the GitHub actions workflow.

