const projectsWrapper = document.getElementById("projectsWrapper");

const portfolioData = [
    {
        title: "Cartersville Outreach International",
        imageSrc: `https://i.imgur.com/9l0t2tA.png`,
        siteUrl: "https://cartersvilleoutreachinternational.org",
        codeUrl: false,
        stack: ["typescript", "nextjs", "css3", "mongodb"],
        desc: `Website created for non-profit evangelical ministry. Created with NextJS, TypeScript, MongoDB, KindeAuth, among other technologies.`
    },
    {
        title: "WB WebDev",
        imageSrc: `https://i.imgur.com/PKOffo6.png`,
        siteUrl: "https://wbwebdev.com",
        codeUrl: false,
        stack: ["typescript", "react", "vitejs"],
        desc: `The website created for my business. Created with Vite, React and hosted on cloudfare pages`
    },
    {
        title: "Runtime Type Checker",
        imageSrc: `https://i.imgur.com/mpkO0kl.png`,
        siteUrl: "https://wbojczuk.github.io/TSRuntimeTypeChecker/",
        codeUrl: "https://github.com/wbojczuk/TSRuntimeTypeChecker",
        stack: ["typescript"],
        desc: `TypeScript is great for Compile-Time Type Checking, but what about type checking dynamic data during Run-Time that could potentially be wrong? That's why I created this tool, and it does it's job well. RuntimeTypeChecker Supports primitive types, complex types like Arrays, Tuples, and Objects. It also supports templates to check complex types against.`
    },
    {
    title: "Calvary United Methodist",
        imageSrc: `https://i.imgur.com/gxv96Im.png`,
        siteUrl: "https://wbojczuk.alwaysdata.net/calvary_united",
        codeUrl: false,
        stack: ["javascript", "php", "css3"],
        desc: `A Site built for the Calvary United Methodist Church. The site includes a masonry-style photo gallery, a landing page, an about section for the pastor, church schedules, and a daily bible verse powered by an API. The site's backend is PHP, Animations are done with GSAP, and the bible verse API is OurManna.`
    },
    {
        title: "GrowInCode Blog",
        imageSrc: `https://i.imgur.com/d9PVQ3B.png`,
        siteUrl: "https://growincode-frontend.pages.dev",
        stack: ["typescript", "nodejs", "express","css3", "react", "mongodb"],
        codeUrl: false,
        desc: `This is a fully functional blog that I've built from the ground up. It used React, react-router-dom, and GSAP on the frontend. It then uses NodeJS, ExpressJS, and MongoDB as the backend. The frontend is hosted on cloudfare to get caching.`
    },
    
    
    {
        title: "DNBBGCM",
        imageSrc: `https://i.imgur.com/YSWlkFF.png`,
        siteUrl: "https://wbojczuk.alwaysdata.net/dnbbgcm",
        stack: ["javascript", "php", "css3"],
        codeUrl: false,
        desc: `This website was created for the Daisy National BB-Gun Championship Match. The site has been accepted as the official site and implementation is in the process. The site was built with a PHP backend.`
    },
    {
        title: "Mt Promiseland Farm",
        imageSrc: `https://i.imgur.com/8NSUyZR.png`,
        siteUrl: "https://mtpromiselandfarm.com",
        codeUrl: false,
        stack: ["javascript", "nodejs", "express","css3", "react"],
        desc: `This React Single Page Application was made for the influencer account mtpromiselandfarm. The UI is very mobile friendly, the site boasts its own full fledged blogging system. The backend is a NodeJS/Express API that is called to get blogs, post blogs, and delete blogs. The frontend is created with mainly React, React-Router-Dom, GSAP, and GLideJS`
    },
    
    
]

let projectHTML = ''
portfolioData.forEach((data)=>{
    let iconsHTML = ''
    data.stack.forEach((stackData)=>{
        iconsHTML += `<iconify-icon icon="devicon:${stackData}"></iconify-icon>`
    })

    projectHTML += `
        <div class="project">
            <img src="${data.imageSrc}" class="project-img"/>
            <h3 class="project-title">${data.title}</h3>
            <p class="project-desc">${data.desc}</p>
            <div class="project-icons-wrapper">
                ${iconsHTML}
            </div>
            <div class="project-buttons-wrapper">
                ${(data.siteUrl != false) ? `<a class="project-button project-site-button" href="${data.siteUrl}" target="_blank">View Site</a>` : ""}
                ${(data.codeUrl != false) ? `<a class="project-button project-code-button" href="${data.codeUrl}" target="_blank">View Code</a>` : ""}
            </div>
        </div>
    `
})

projectsWrapper.innerHTML = projectHTML
