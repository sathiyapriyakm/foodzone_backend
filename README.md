# [Foodzone](https://courageous-vacherin-7d1d78.netlify.app) - Website

  [Front End](https://github.com/sathiyapriyakm/foodzone_frontend)
  [Back End](https://github.com/sathiyapriyakm/foodzone_backend)

## Brief Description

- foodzone website is a  online food ordering website where user can view different varient of food items and can order as per choice.
Once the payment through RazorPay payment Gateway is done admin gets notification about new order.

- Admin can add new product as well as edit and delete exisitng product
- Admin can change the status of order 


Payment - RazorPay Payment gateway is used for Payment Purpose  
`Payment Method`:
Select Net Banking -> select any Bank -> click on Pay button -> click on success

### `Short tech summary`
  - Implemented authentication,authorization using Json Web Token for login,along with CRUD features.
  - Integrated payment gateway by RazorPay API to collect service and display transaction status.
  - Used Socket.io for notification to admin about payments.
  


## Features

### `User features`
  - User can view food items list only after logging in 
  - User can add different food items to cart and can remove any or all item from cart
  - Once payment is done order is confirmed and user can see latest status of order in my orders page  
  

### `Admin features`
  - Admin Can add new product/foodZone
  - Edit or Delete exisitng product
  - Can update status of order
 
  
## Tech Used
  - ReactJS
  - ExpressJS
  - NodeJS
  - MongoDB and MongoDB ChangeStream
  - Socket.io - for payment notification
  - RazorPay Payment Gateway for Payment Integration

## ScreenShots
- Homepage / Login Page
![Homepage](/ScreenShots/Home.JPG "Homepage")

- food items List 
![food items List ](/ScreenShots/FoodItemList.JPG "food items List ")

- Customer Orders Page
![Customer Orders Page](/ScreenShots/CustomerOrdersPage.JPG "Customer Orders Page")

- Cart 
![Cart](/ScreenShots/Cart.JPG "Cart View")

- Payment
![Payment](/ScreenShots/Payment.JPG "Payment")

- Admin Add foodZone 
![Add food items ](/ScreenShots/AddfoodItems.JPG "Add food item ")

- Admin Pending Orders View
![Admin Pending Orders](/ScreenShots/AdminPendingOrders.JPG "Admin Pending Orders")

- Admin Product List
![Admin Product List](/ScreenShots/AdminProductList.JPG "Admin Product List")








