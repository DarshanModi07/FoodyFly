import React from "react";

const About = () => {
    return (
        <div className="flex justify-center my-6 md:my-6">
            <div className="w-[95%] md:w-[98%] bg-[#d7e9f5] rounded-xl border-4 shadow-2xl border-[#4a7ac3] font-serif p-6 md:p-10 dark:bg-gray-800 dark:border-[#4a7ac3] dark:text-white transition-colors duration-200 ">
                
                <h1 className="text-3xl md:text-5xl font-bold mb-8 text-center text-[#4a7ac3] drop-shadow-sm dark:text-white">
                    About FoodyFly
                </h1>

                <p className="text-base md:text-lg text-gray-800 dark:text-gray-200 mb-8 leading-relaxed text-justify md:text-left">
                    FoodyFly is a premier food delivery service dedicated to bringing delicious and diverse culinary experiences right to your doorstep. Our mission is to connect food lovers with their favorite local restaurants and hidden gems, making it easier than ever to enjoy great food from the comfort of home.
                </p>

                <div className="mb-8">
                    <h2 className="text-2xl md:text-3xl font-bold text-[#4a7ac3] border-b-2 border-[#4a7ac3] inline-block mb-4 dark:text-[#6fa3f7]">
                        Our Story
                    </h2>
                    <p className="text-base md:text-lg text-gray-800 dark:text-gray-200 leading-relaxed text-justify md:text-left">
                        Founded in 2023, FoodyFly was born out of a passion for food and a desire to support local eateries. We recognized the growing demand for convenient food delivery options and set out to create a platform that not only offers a wide variety of cuisines but also prioritizes quality and customer satisfaction.
                    </p>
                </div>

                <div className="mb-8">
                    <h2 className="text-2xl md:text-3xl font-bold text-[#4a7ac3] border-b-2 border-[#4a7ac3] inline-block mb-4 dark:text-[#6fa3f7]">
                        Our Values
                    </h2>
                    <ul className="list-disc list-inside space-y-3 text-base md:text-lg text-gray-800 dark:text-gray-200 pl-2">
                        <li><strong className="text-[#4a7ac3] dark:text-[#6fa3f7]">Quality:</strong> We prioritize high-quality ingredients and authentic recipes.</li>
                        <li><strong className="text-[#4a7ac3] dark:text-[#6fa3f7]">Customer Satisfaction:</strong> Our customers are at the heart of everything we do.</li>
                        <li><strong className="text-[#4a7ac3] dark:text-[#6fa3f7]">Diversity:</strong> We celebrate culinary diversity by offering a wide range of dishes from different cultures.</li>
                        <li><strong className="text-[#4a7ac3] dark:text-[#6fa3f7]">Sustainability:</strong> We are committed to sustainable practices in sourcing and packaging.</li>
                    </ul>
                </div>

                <div className="mb-8">
                    <h2 className="text-2xl md:text-3xl font-bold text-[#4a7ac3] border-b-2 border-[#4a7ac3] inline-block mb-4 dark:text-[#6fa3f7]">
                        Contact Us
                    </h2>
                    <p className="text-base md:text-lg text-gray-800 dark:text-gray-200">
                        If you have any questions or would like to learn more about FoodyFly, please feel free to reach out to us at <span className="font-bold text-[#4a7ac3] dark:text-[#6fa3f7] cursor-pointer hover:underline break-all">contact@foodyfly.com</span>.
                    </p>
                </div>

                <div>
                    <h2 className="text-2xl md:text-3xl font-bold text-[#4a7ac3] mb-4 dark:text-[#6fa3f7]">
                        Find Us
                    </h2>
                    <div className="w-full h-64 md:h-96 rounded-lg overflow-hidden shadow-lg border-2 border-[#4a7ac3] dark:border-[#6fa3f7]">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.835434509374!2d144.9537353153169!3d-37.8162797420216!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11fd81%3A0xf577d6a32f7f1f84!2sFederation%20Square!5e0!3m2!1sen!2sau!4v1614131652422!5m2!1sen!2sau"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="Google Map"
                        ></iframe>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default About;