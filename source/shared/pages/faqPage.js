import React from 'react';
import Auth from 'shared/components/auth';
import Container from 'shared/components/container';
import Navigation from 'shared/components/navigation';
import FAQContent from 'shared/components/faqContent';

const FAQPage = () => (
    <div>
        <Navigation opened="FAQ" />
        <Container>
            <FAQSection>
                <h1>Questions?</h1>
                <p>Get answers to some common questions!<br />If you still have some questions you can email us at <a href="mailto:info@transfervans.co.nz">info@transfervans.co.nz</a> or call us on 09 951 8705.</p>
                <h2>Using the Platform</h2>
                { data.USING_THE_PLATFORM.map(qa => <FAQContent key={qa.question} qa={qa} />)}

                <h2>General</h2>
                { data.GENERAL.map(qa => <FAQContent key={qa.question} qa={qa} />)}

                <h2>Bookings</h2>
                { data.BOOKINGS.map(qa => <FAQContent key={qa.question} qa={qa} />)}

                <h2>Services</h2>
                { data.SERVICES.map(qa => <FAQContent key={qa.question} qa={qa} />)}

                <h2>Pricing and Payments</h2>
                <p>If you have any questions regarding your pricing plan please email us at <a href="mailto:info@transfervans.co.nz">info@transfervans.co.nz</a> or call us on 09 951 8705.</p>
                { data.PRICING_AND_PAYMENTS.map(qa => <FAQContent key={qa.question} qa={qa} />)}

                <h2>Tech Support</h2>
                { data.TECH_SUPPORT.map(qa => <FAQContent key={qa.question} qa={qa} />)}
                
                <h2>Contact</h2>
                <p>Contact our Customer Service Team anytime via email at <a href="mailto:info@transfervans.co.nz">info@transfervans.co.nz</a> or call us on 09 951 8705 anytime between 9am - 5pm, 7 days a week with any questions, comments or concerns.</p>
            </FAQSection>
        </Container>
    </div>
);

export default Auth(FAQPage);

import styled from 'styled-components';
import { colors } from 'shared/styles/variables';
const FAQSection = styled.div`
    & > h1 {
        font-size: 3.8rem;
        margin-bottom: 1.6rem;
    }
    & > h2 {
        font-size: 2.4rem;
        margin: 3rem 0 1.5rem 1rem;
    }
    & > p {
        font-size: 1.6rem;
        line-height: 1.8;
        margin: 0 0 1.6rem 1.2rem;
        & > a {
            color: ${colors.blue};
        }
    }
`;

const data = {
    USING_THE_PLATFORM: [
        {
            question: 'How do I make a booking?',
            answer: `
            <p>Making a booking on our business platform is extremely easy, just follow the following steps:</p>

            <ol>
                <li>Go to https://www.transfervans.co.nz/business and log in</li>
                <li>Go to the New Booking page either by selecting it on the menu on the left hand side of the page or by selecting from the drop down next to your business name.</li>
                <li>Select the date and time of your delivery - making sure the pick-up location is open before the earliest drop-off time. When selecting a 2 hour pick-up window please allow at least 2 hours notice before pick-up so we can ensure a driver is available. If you require an urgent pick up, please call our customer service team on 09 951 8705 and we will do our best to accommodate this.</li>
                <li>Enter the customer details</li>
                <li>Select the pick-up location from a drop down of your saved store addresses, these will appear as the Store Names you have given them in the left box and the street address in the box on the right. You can also select ‘other location’ and type in a different pick-up location in the box to the right.</li>
                <li>Enter the drop-off location and enter the Unit of the address if necessary i.e. 5H/47 High Street, Auckland would have 5H as the Unit, and the address as 47 High Street, Auckland.</li>
                <li>Add any special access notes about the delivery i.e. park down the driveway</li>
                <li>Add the items and accessories you are delivering with the number of cartons/pieces specified, as well as the volume and weight of the item as accurately as possible.</li>
                <li>Add the invoice number (if necessary) and any additional information you think the driver should be aware of or take note of.
                Proceed to ‘Get Quote’ and ‘Make Booking’</li>
            </ol>

            <p>Once you’ve followed the steps above your booking will be requested. Our team will confirm it and assign a driver as soon as possible, and you can view your booking and it’s status on the Dashboard!</p>
            `
        },
        {
            question: 'What is authority to leave?',
            answer: `
            <p>If you select authority to leave, you must specify where the driver should leave the item/s if there is no one home. This place needs to be weatherproof, out of view of the street, and sage and easy for the Driver to access. If the location is not specified in the drop down, select other and specify the location in the <strong>Special Access Notes</strong>.</p>

            <p>You must select that you accept the terms and conditions, and confirm that you have authority to use authority to leave, if you are using this service.</p>
            
            <p>Please bear in mind that Transfervans and the Driver is not liable if the item is stolen or damaged after the Driver has left the item/s at the drop-off location.</p>
            `
        },
        {
            question: 'What are accessories? How are they different from items?',
            answer: `
            <p>Both accessories and items have number of boxes/cartons/pieces that should be specified, along with the volume and weight of the accessory or item. Please be as accurate as possible.</p>

            <p>If you are not sure if your object is an accessory or an item, or you have any further questions about accessories please call our customer service team on 09 951 8705.</p>
            `
        },
        {
            question: 'How do I filter my bookings on Dashboard and History?',
            answer: `
            <p>On both the Dashboard and History pages, there is a table listing the relevant deliveries and their key details. Above the table on both pages is a drop down on the left and the right. By changing the values in the filter, changes the deliveries showing in the table.</p>

            <p>All pick-up locations: is the default of the filter on the left. This drop-down allows you to filter deliveries by the pick-up locations either all pick-up locations or the Store Names saved as your Store Addresses on the Account page.</p>

            <h4>On Dashboard:</h4>
            <p>All Upcoming: is the default filter on the right. This drop-down allows you to filter deliveries by when they are scheduled. You can view all upcoming, deliveries scheduled for today and deliveries scheduled for tomorrow. You can also select Completed as a filter which takes you to the History Page.</p>

            <h4>On History:</h4>
            <p>Completed: is the default filter on the right. You can also select Upcoming as a filter which takes you to the Dashboard.</p>

            <p>Please note, that your entire booking history is not available on the History page. Simply call our customer service team on 09 951 8705 or email us at <a href="mailto:info@transfervans.co.nz">info@transfervans.co.nz</a> for bookings not shown on the History page.</p>
            `
        },
        {
            question: 'How to view the status of my booking / how do I know if my booking has been confirmed?',
            answer: `
            <p>You can view the status of your booking on the Dashboard. If your booking has a Status C your booking has been confirmed. </p>

            <p>You can also see the status of your booking when you view your booking by selecting it from the Dashboard. In the top-left corner on your booking the status will appear.</p>

            <p>If you’re not sure if your booking has been confirmed, give us a call on 09 951 8705 and we will double-check for you.</p>
            `
        },
        {
            question: 'How do I add or remove an address for my business?',
            answer: `
            <p>Go to transfervans.co.nz/business and select Account from the side menu.</p>

            <h4>To add a new address:</h4>
            <ol>
                <li>Select ‘ADD NEW ADDRESS’ which is situated below your current store addresses</li>
                <li>Add a Store Name for your convenience - you can filter your bookings by this address and this store name will show on your bookings rather than the street address</li>
                <li>Add the physical location (street address) for your store</li>
                <li>Select ‘SAVE’ which is situated to the right of your new address</li>
            </ol>
	        <p>Your new address should show up immediately on your account page. You can now create a booking using this address and filter your bookings on History or the Dashboard with this address.</p>

            <h4>To remove an address:</h4>
            Select the red cross bubble on the right on the address you want to delete.
            Your address should disappear from your account page immediately. You will no longer be able to create bookings with this address and you will not be able to filter bookings on History or the Dashboard with this address. However, the address and store name will still be visible on past and upcoming bookings with this address. 
            `
        },
        {
            question: 'Why are there store names?',
            answer: `
            <p>Store names are included for your convenience. You can now filter deliveries on your dashboard by pick-up location. For example, having a store name means you can see all upcoming deliveries from your Warehouse address or City address.</p>
            `
        },
    ],
    GENERAL: [
        {
            question: 'What is Transfervans?',
            answer: `
            <p>Transfervans offers an easy, fast and affordable delivery service for retailers - 7 days a week from 6am - 10pm.</p>

            <p>Demands have changed and customers don’t want to stay at home at inconvenient hours to receive their purchase(s). Our platform meets and goes beyond their expectations. Customers can choose a delivery time and date that suits them and our drivers update them on the progress of their delivery so that they can sit back and relax.</p>
            `
        },
        {
            question: 'How long has Transfervans been around?',
            answer: `
            <p>We are a relatively young company that was founded in 2016. Through our innovative platform, we are growing rapidly and we are trusted by more and more retailers, including some of the biggest furniture brands in New Zealand.</p>
            `
        },
        {
            question: 'Do you have your own drivers?',
            answer: `
            <p>We are a third-party platform. This means that we connect your business and customers with our network of trusted providers across Auckland. We do not own any of the vehicles and we do not employ any of the drivers, they are independent contractors that have met our quality assurance standards.</p>
            `
        },
    ],
    BOOKINGS: [
        {
            question: 'Can I update or cancel my booking online?',
            answer: `
            <p>You cannot update or cancel your booking online at this stage, but give us a call on 09 951 8705 - we can do this over the phone for you, no problem.</p>

            <p>Please note that If the driver is already on his/her way, we may have to charge a call out fee.</p>
            `
        },
        {
            question: 'Can I book via email or on the phone?',
            answer: `
            <p>Booking online is super fast and easy.</p>

            <p>However, if you have a complex booking or simply prefer to book via phone or email, get in touch on 09 951 8705 or info@transfervans.co.nz. Our customer service team are on hand 9am - 5pm, 7 days.</p>

            <p>We will need the following information to complete your booking:</p>
            <ul>
                <li>pick-up and drop-off locations</li>
                <li>items to be collected</li>
                <li>invoice number (if applicable)</li>
                <li>date and pick-up window</li>
                <li>customer’s name and contact details (mobile number and email address)</li>
            </ul>
            `
        },
        {
            question: "I can't find a past booking on History?",
            answer: `
            <p>Only the last few months of bookings are kept on the History page. If a completed booking is no longer visible on History, please email our customer service team on on info@transfervans.co.nz or call us 09 951 8705 for a report.</p>
            `
        },
        {
            question: "How much notice do you need for a booking?",
            answer: `
            Please allow at least 2 hours notice before pick-up so we can ensure a driver is available. If you require and urgent pick up, please call our customer service team on 09 951 8705 and we will do our best to accommodate this.
            `
        },
    ],
    DRIVERS: [
        {
            question: 'Can I choose my driver?',
            answer: `
            <p>In order for us to provide an efficient, on-demand service, we allocate drivers based on location and vehicle type. This means you can’t choose your driver, however all of our drivers are rated by customers using AskNicely at the end of every delivery, so you’ll always be in good hands.</p>
            `
        },
        {
            question: 'How can I contact my driver?',
            answer: `
            <p>Your driver’s contact details will appear on your booking as soon as they’ve been confirmed. You can contact them via phone at any time.</p>

            <p>If you can’t get through to them straight away, they may be on the road and will call you back as soon as they can. If you’re having trouble getting through, give our customer service team a call on 09 951 8705.</p>
            `
        },
    ],
    SERVICES: [
        {
            question: 'How are my customers updated on the progress of their delivery?',
            answer: `
            <p>Your customer receives four text messages and an email:</p>
            <ol>
                <li>Email and Text: when the booking is confirmed. Typically within 15 minutes after the booking was made.</li>
                <li>Text: delivery reminder text. For deliveries booked more than 2 days out.</li>
                <li>Text: the driver details (name and mobile number). Typically on the day of the delivery or the night before for early deliveries.</li>
                <li>Text: driver on the way. Sent to inform the customer their order will be delivered within the hour.</li>

            <p>If you update the schedule date or time of a delivery, the updated schedule details are sent to your customer via text.</p>

            <p>Any changes to the drivers details on the day of the delivery are sent to your customer via text immediately. </p>
            `
        },
        {
            question: "Does Transfervans do multiple drop-offs, multiple pick-ups or swaps?",
            answer: `
            <p>Yes we can. If you require multiple drop-offs, multiple pick-ups or swaps please contact our customer service team on 09 951 8705. They can organise this for you. </p>

            <p>Please note, you cannot book multiple drop-offs, multiple pick-ups or swaps on this platform at this stage.</p>
            `
        },
        {
            question: "Does Transfervans offer assembly services?",
            answer: `
            <p>We don’t do this at this stage. Please let us know if this a requirement for your business, as we might offer this service in the future.</p>
            `
        },
        // {
        //     question: "How many items can I book per delivery? / How many vehicles should I request?",
        //     answer: `
        //     no answer on documents
        //     `
        // },
        {
            question: "What type of equipment do your drivers have?",
            answer: `
            <p>All vehicles are equipped with trolleys, blankets and straps to ensure items are moved with the utmost care.</p>
            `
        },
        {
            question: "What is your service area?",
            answer: `
            <p>We service the wider Auckland region, from Orewa down to Pukekohe (excluding offshore islands).</p>
            `
        },
        {
            question: "When can you deliver?",
            answer: `
            <p>We deliver 7 days a week from 6am -10pm.</p>

            <p>Our office operates 7 days a week from 9am - 5pm. You can reach our customer service team on 09 951 8705 or via email on info@transfervans.co.nz.</p>
            `
        },
        {
            question: "Is there a weight limit?",
            answer: `
            <p>Yes. We only move items that can be carried safely by two people, with the help of a trolley.</p>

            <p>Please speak to our customer service team on 09 951 8705 so we can check whether we can move your item.</p>
            `
        },
    ],
    PRICING_AND_PAYMENTS: [
        {
            question: "What payment methods do you accept? How often do you invoice?",
            answer: `
            <p>We invoice retailers weekly for any deliveries completed the week prior. You can pay these via a direct bank transfer. We have a payment term of 7 days.</p>
            `
        },
    ],
    TECH_SUPPORT: [
        {
            question: "I cannot log in, I have forgotten my password",
            answer: `
            <p>If you have forgotten your password, try the ‘reset password’ button on the sign-in page. This should send a link to the email address you have registered on the website. Follow the link and create a new password to login. </p>
            
            <p>This may take a few minutes to come through, but if you haven’t received it within 10 minutes, give us a call on 09 951 8705 and we will resend it to you.</p>
            `
        },
        {
            question: "I cannot see if my booking has been confirmed",
            answer: `
            <p>You can view the status of your booking on the Dashboard. If your booking has a Status C your booking has been confirmed. </p>
            
            <p>You can also see the status of your booking when you view your booking by selecting it from the Dashboard. In the top-left corner on your booking the status will appear. Your driver’s contact details will also appear on your booking as soon as it’s been confirmed - and those can also be seen when you view your booking. </p>

            <p>If your driver’s details are not there, or you’re not sure if your booking has been confirmed, give us a call on 09 951 8705 and we will double-check for you.</p>
            `
        },
    ],
}