

const Contact = () => {
    return (
        <div className="flex justify-center my-6 md:my-6">
            <div className="w-[95%] md:w-[98%] bg-[#d7e9f5] rounded-xl border-4 shadow-2xl border-[#4a7ac3] font-serif p-6 md:p-10 dark:bg-gray-800 dark:border-[#4a7ac3] dark:text-white transition-colors duration-200">
                
                <h1 className="text-3xl md:text-5xl font-bold mb-8 text-center text-[#4a7ac3] drop-shadow-sm dark:text-white">
                    Contact FoodyFly
                </h1>
                
                <p className="text-base md:text-lg text-gray-800 dark:text-gray-200 mb-8 leading-relaxed text-center">
                    We would love to hear from you! Whether you have questions about our menu, need assistance with an order, or just want to share your feedback, our team is here to help.
                </p>

                <div className="grid md:grid-cols-2 gap-8 md:gap-12">
                    
                    <div>
                        <h2 className="text-2xl md:text-3xl font-bold text-[#4a7ac3] border-b-2 border-[#4a7ac3] inline-block mb-4 dark:text-[#6fa3f7]">
                            Contact Information
                        </h2>
                        <ul className="space-y-4 text-base md:text-lg text-gray-800 dark:text-gray-200">
                            <li>
                                <strong className="text-[#4a7ac3] dark:text-[#6fa3f7]">Email:</strong>{" "}
                                <a href="mailto:contact@foodyfly.com" className="hover:underline hover:text-[#4a7ac3] transition-colors break-all">
                                    contact@foodyfly.com
                                </a>
                            </li>
                            
                            <li>
                                <strong className="text-[#4a7ac3] dark:text-[#6fa3f7]">Phone:</strong>
                                <ul className="ml-4 mt-1 space-y-1 text-sm md:text-base opacity-90">
                                    <li>Customer Service: +1-800-123-4567</li>
                                    <li>Business Inquiries: +1-800-987-6543</li>
                                </ul>
                            </li>
                            
                            <li>
                                <strong className="text-[#4a7ac3] dark:text-[#6fa3f7]">Address:</strong>
                                <div className="ml-4 mt-1 text-sm md:text-base opacity-90">
                                    <p>FoodyFly Headquarters</p>
                                    <p>123 Culinary Lane</p>
                                    <p>Foodie City, FL 12345</p>
                                </div>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h2 className="text-2xl md:text-3xl font-bold text-[#4a7ac3] border-b-2 border-[#4a7ac3] inline-block mb-4 dark:text-[#6fa3f7]">
                            Business Hours
                        </h2>
                        <p className="mb-2 text-gray-800 dark:text-gray-200 text-base md:text-lg">Our customer service team is available:</p>
                        <ul className="space-y-2 text-base md:text-lg text-gray-800 dark:text-gray-200 mb-8 ml-2">
                            <li><span className="font-semibold">Mon - Fri:</span> 9:00 AM - 6:00 PM (EST)</li>
                            <li><span className="font-semibold">Saturday:</span> 10:00 AM - 4:00 PM (EST)</li>
                            <li><span className="font-semibold text-red-500 dark:text-red-400">Sunday:</span> Closed</li>
                        </ul>

                        <h2 className="text-2xl md:text-3xl font-bold text-[#4a7ac3] border-b-2 border-[#4a7ac3] inline-block mb-4 dark:text-[#6fa3f7]">
                            Follow Us
                        </h2>
                        <p className="mb-4 text-gray-800 dark:text-gray-200 text-base md:text-lg">
                            Stay connected for the latest updates and recipes:
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <a href="#" target="_blank" rel="noopener noreferrer" 
                               className="px-4 py-2 bg-[#4a7ac3] text-white rounded-lg hover:bg-[#365a96] transition-transform hover:scale-105 shadow-md text-sm md:text-base">
                               Facebook
                            </a>
                            <a href="#" target="_blank" rel="noopener noreferrer" 
                               className="px-4 py-2 bg-[#1DA1F2] text-white rounded-lg hover:bg-[#0d8ddb] transition-transform hover:scale-105 shadow-md text-sm md:text-base">
                               Twitter
                            </a>
                            <a href="#" target="_blank" rel="noopener noreferrer" 
                               className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:opacity-90 transition-transform hover:scale-105 shadow-md text-sm md:text-base">
                               Instagram
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Contact;