fetch('../data/data.json')
    .then(response => response.json())
    .then(data => {
        let keys = Object.keys(data.posts_by_date).reverse()
        let posts = data.posts_by_date

        //console.log(posts["2021-06-17"].map(postTemplate).join(" "))

        function sortByDateTemplate(d){
            return `
                <div class="sort-by-date">
                    <span class="post-date">
                        ${new Date(d).toLocaleDateString('en-GB', {day : 'numeric', month : 'long', year : 'numeric'})}
                    </span>
                    <div class="post-list">
                        ${posts[d].map(postTemplate).join(" ")}
                    </div>
                </div>
            `
        }

        function postTemplate(p){
            var json_date = new Date(p.published_at)
            var date = json_date.toLocaleDateString('en-GB', {day : 'numeric', month : 'long', year : 'numeric'}) + " - " 
                     + json_date.toLocaleTimeString('en-GB', {hour: 'numeric', minute: 'numeric'})
            return `
                <div class="post">
                    <div class="social-media">
                        <img class="social-media-img" src="${socialMediaTemplate(p)}">
                    </div>
                        <div class="post-inside">
                        <p>
                            ${date}
                            <br/>
                            ${p.entry.message.includes("http") ? postTextTemplate(p) : p.entry.message}
                        </p>
                        <img class="post-photo" src="${p.entry.image[0]}" 
                            onerror="if (this.src != 'Frontend Developer Project Assets/no-post-image.png') 
                            this.src = 'Frontend Developer Project Assets/no-post-image.png';" alt="post-media">
                        </div>
                </div>
            `
        }

        function postTextTemplate(p){
            return `
                ${p.entry.message.substr(0,p.entry.message.indexOf("http"))}
                <a href="${p.entry.message.substr(p.entry.message.indexOf("http"))}">
                    ${p.entry.message.substr(p.entry.message.indexOf("http"))}
                </a>
            `
        }

        function socialMediaTemplate(p){
            if(p.account.channel=="facebook")
                return "Frontend Developer Project Assets/facebook.png"
            else if(p.account.channel=="twitter")
                return "Frontend Developer Project Assets/twitter.png"
            else if(p.account.channel=="instagrambusiness")
                return "Frontend Developer Project Assets/instagram.png"
            else
                return ""
        }

        document.getElementById("app").innerHTML = `
                ${keys.map(sortByDateTemplate).join(" ")}
        `  
    })
    .catch(function(error){
        console.error(error);
    });
