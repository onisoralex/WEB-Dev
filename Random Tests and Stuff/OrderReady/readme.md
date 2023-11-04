Initial Functionality
- Have a screen/PC connected to the main page and click on the screen mode
--> https://stackoverflow.com/questions/9406950/updating-html-element-every-second-with-content-from-mysql-database
- Have a mobile device main page and click on the order mode on the screen
--> The device in the order mode sees a list of all current done orders. Orders can be added and deleted. All changes should be reflected on the device checked in as screen
- Have a server webapp do the data handling
--> REST is needed here to send the order numbers to the server and then pushto the screen
https://medium.com/@sagarkumar2499/best-alternatives-to-ajax-dee210d71ed7#:~:text=Fetch%20API%3A%20The%20Fetch%20API,interface%20for%20making%20network%20requests.


Advanced Features
- Have a 3rd mode where the order-taking device can log in and place specific orders tied to numbers
- Include a text field to add the order to the number
- Additionally to a text field also include some configurable buttons for shortcuts. Should be some kind of autofill for the textfield, so you can also miodify the selection
- (Optional) Also add number fields to select how many of a product
- The orders will apear on a screen/device at the processing station
- After order is prepared it can be clicked to be sent to the pickup station (screen) 
- Person at pickup station can then remove the orders that have been processed already
- Multiple devices should be able to connect to the same stage, thus people can go to customers and take in orders directly
