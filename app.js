window.addEventListener('load', () => {
   let long;
   let lat;
   let temperatureDescription = document.querySelector('.temperature-description');
   let temperatureDegree = document.querySelector('.temperature-degree');
   let location = document.querySelector('.location');
   let locationTimezone = document.querySelector('.location-timezone');
   let temperatureSection = document.querySelector('.temperature');
   const temperatureSpan = document.querySelector('.temperature span');

   function createImg(src) {
       const img = document.createElement('img');
       img.classList.add('icon');
       img.src = src;

       return img;
   }

   if (navigator.geolocation) {
       navigator.geolocation.getCurrentPosition(position => {
          long = position.coords.longitude;
          lat = position.coords.latitude;
          const url = `http://api.weatherapi.com/v1/current.json?key=90aceee821c4445e827185756212604&q=${lat},${long}`;

           fetch(url)
               .then(response => {
                   return response.json();
               })
               .then(data => {
                   const { temp_f } = data.current;
                   const { text } = data.current.condition;
                   const { tz_id } = data.location;
                   const iconSrc = `https:${data.current.condition.icon}`;

                   temperatureDegree.textContent = temp_f;
                   temperatureDescription.textContent = text;
                   locationTimezone.textContent = tz_id;
                   location.appendChild(createImg(iconSrc));

                   let celsius = (temp_f - 32) * (5 / 9);

                   temperatureSection.addEventListener('click', () => {
                      if (temperatureSpan.textContent === 'F') {
                          temperatureSpan.textContent = 'C';
                          temperatureDegree.textContent = Math.floor(celsius);
                      } else {
                          temperatureSpan.textContent = 'F';
                          temperatureDegree.textContent = temp_f;
                      }
                   });
               })
               .catch(err => console.error(err));
       });
   }
});
