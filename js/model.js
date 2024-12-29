document.addEventListener("DOMContentLoaded", function () {
    const serviceContent = document.getElementById('service-content');

    // Simulate fetching data (you can replace this with an actual API call)
    const serviceData = [
        {
            title: "Web Development",
            description: "We create stunning and functional websites to help your business grow."
        },
        {
            title: "SEO Optimization",
            description: "Improve your website’s ranking on search engines and drive more traffic."
        },
        {
            title: "Digital Marketing",
            description: "Our strategies will help you engage your target audience and increase conversions."
        }
    ];

    // Generate HTML for each service and append it to the container
    serviceData.forEach(service => {
        const serviceItem = document.createElement('div');
        serviceItem.classList.add('service-item');
        serviceItem.innerHTML = `
            <h3>${service.title}</h3>
            <p>${service.description}</p>
        `;
        serviceContent.appendChild(serviceItem);
    });
});
