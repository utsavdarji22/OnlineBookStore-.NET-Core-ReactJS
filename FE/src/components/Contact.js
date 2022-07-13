import React from 'react'

export const Contact = () => {
  return (
    <div>
       <section className="contact">
        <div className="cont container">
            <div className="contact-text">
                <p>Drop your inquiry here and our experts will get back to you.</p>
                <h6>Address</h6>
                <p className="address">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio, rerum.
                </p>
                <h6>Email</h6>
                <p className="mail">contactus@gmail.com</p>
            </div>
            <div className="contact-form">
                <form>
                    <label for="name">Name</label>
                    <input type="text" name="name" id="name" required />
                    <label for="email">Email</label>
                    <input type="email" name="email" id="email" required />
                    <label for="message">Message</label>
                    <textarea name="message" id="message" cols="30" rows="5" required></textarea>
                    <input type="submit" value="submit" />
                </form>
            </div>
        </div>
    </section> 
    </div>
  )
}
