# Lab8_Starter
By Thet Paing Zaw, Andrew Pham
## Check your understanding q's (FILL OUT)
1. In your own words: Where would you fit your automated tests in your Bujo project development pipeline? (just write the letter)
   
Answer: It would fit when within a Github action that runs whenever code is pushed. As the bullet journal grows, it would be great to test each push rather than doing manual testing at the end which would be very much time consuming. 

2. Would you use a unit test to test the “message” feature of a messaging application? Why or why not? For this question, assume the “message” feature allows a user to write and send a message to another user.
   
Answer: It seems as the message feature is relying on other components so unit test would not be suited for it. Instead we could test each components in the message feature with small units test and see if they are working properly. 

3. Would you use a unit test to test the “max message length” feature of a messaging application? Why or why not? For this question, assume the “max message length” feature prevents the user from typing more than 80 characters
   
Answer: Yes, because testing a max message length is a small function which is not relying on other components so we could use unit test on that. 

4. What do you expect to happen if we run our puppeteer tests with the field “headless” set to true?
   
Answer: If it were set to true, the test will be run without chrominum. We will only be able to see the result but not the process. 


5. What would your beforeAll callback look like if you wanted to start from the settings page before every test case?
   
Answer: We could add a link such as await page.click('img'); to click on the setting image so that we will be starting from the setting page. 

