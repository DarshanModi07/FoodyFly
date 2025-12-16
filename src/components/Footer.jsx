export const Footer = () => {
    return (
        <>
        <div className="bg-[#4a7ac3] text-white font-serif m-4 p-4 rounded-lg shadow-2xl flex flex-col gap-2 dark:bg-gray-800">
            <p style={{textAlign: "center"}}>© 2024 FoodyFly. All rights reserved.</p>
            <span>Contact us :</span>
            <span> Email :
                <a href="mailto:contact@foodyfly.com">contact@foodyfly.com</a>
            </span>
            <p>Phone : +1 (123) 456-7890</p>
            <span>Follow us on social media : </span>
            <span>
                <a href="#" target="_blank" rel="noopener noreferrer"> Facebook</a> |  
                <a href="#" target="_blank" rel="noopener noreferrer"> Twitter</a> | 
                <a href="#" target="_blank" rel="noopener noreferrer"> Instagram</a>
            </span>
        </div>
        </>
    )
}