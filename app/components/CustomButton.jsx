import React, {useState, useEffect} from 'react';
import { Image } from '@shopify/hydrogen';
const CustomButton = ({buttonText = 'Command'}) => {
  const [fillColor, setFillColor] = useState('black');
  const [clicked, setClicked] = useState(false); // New state to track if the button was clicked
  const soundUrl =
    'https://cdn.shopify.com/s/files/1/0786/5417/7611/files/Sound_Effect.mp3?v=1699196520';

  useEffect(() => {
    // Preload the audio
    const audio = new Audio(soundUrl);
    audio.load();
  }, []);

  const handleClick = () => {
    if (!clicked) {
      setFillColor('#DB202E'); // Change fill color of SVG
      const audio = new Audio(soundUrl);
      audio.play(); // Play the sound
      setClicked(true); // Update the state to indicate the button has been clicked
    }
  };

  return (
    <div className="flex justify-center relative flex-col items-center h-screen">
      <h2 className="text-center">ALLUME LE MOTEUR</h2>
      <h3 className="text-center md:pb-40">
        Mmmh faites ronronner les mécaniques
      </h3>
      <button className="button" onClick={handleClick}>
        <div className="button__content">
          <div className="button__icon">
            {/* SVG content */}
            <svg
              width="483"
              height="545"
              viewBox="0 0 483 545"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M335.021 3.31871C316.26 5.99888 284.693 11.657 254.616 17.6129C244.789 19.6975 229.005 21.7821 219.476 22.6755C210.244 23.5689 201.608 25.6534 200.715 27.1424C198.332 30.716 207.266 37.5652 218.88 41.1388C228.41 44.1167 241.215 48.8815 268.017 59.3044C276.951 62.8779 288.565 66.7493 293.329 67.9405C304.943 70.6206 307.326 81.6391 297.201 84.6171C284.991 88.1906 265.634 98.3157 261.763 102.783C255.807 110.228 263.55 112.908 290.351 112.908C303.454 112.908 325.194 113.801 338.594 114.695L362.716 116.779L379.392 100.996C389.518 91.4664 397.558 86.106 400.238 86.9994C405.599 89.084 418.999 109.632 421.382 119.757C423.169 126.606 421.977 127.5 388.029 138.22C306.73 163.831 297.796 167.702 297.796 174.849C297.796 177.529 299.881 186.463 302.263 194.504C309.41 217.434 303.752 218.625 283.204 198.077C272.186 187.059 264.145 181.401 262.061 182.89C259.976 184.081 253.722 190.335 248.064 196.588C239.428 206.118 235.557 208.203 226.325 208.203C203.99 208.203 202.204 211.776 209.053 244.534C211.138 253.765 211.435 262.699 210.244 263.89C209.053 265.082 201.906 259.126 194.461 250.49C187.314 242.151 178.678 235.004 175.7 235.004C172.722 235.004 152.77 248.703 131.924 265.379C83.9786 303.795 75.9381 309.453 70.2799 309.453C65.2174 309.453 47.6474 281.163 47.6474 273.42C47.6474 267.762 53.6033 264.784 63.7284 264.784C67.302 264.784 76.5336 262.699 84.2764 260.019C95.2948 256.148 99.1662 253.17 104.229 243.045C107.802 236.195 112.269 227.857 114.056 224.581C140.858 178.721 147.111 163.533 139.964 163.533C138.475 163.533 128.946 168.893 118.821 175.445C108.696 181.996 99.1662 187.357 97.975 187.357C92.9124 187.357 92.0191 181.103 95.2948 168.893C106.611 126.309 116.141 84.6171 116.141 78.6611C116.141 76.2788 114.949 74.1942 113.46 74.1942C110.482 74.1942 49.732 135.838 19.6546 169.191C7.14711 183.485 0 193.908 0 198.673C0 205.82 6.25372 234.111 13.6986 260.019C16.081 267.762 17.8678 277.291 17.8678 280.567C17.8678 283.843 19.6546 293.372 22.0369 301.711C24.4193 310.049 28.8862 327.023 32.162 339.233C36.6289 357.398 38.7135 361.865 43.7761 362.461C49.4342 363.354 65.2174 355.909 131.03 320.472C143.24 313.92 162.001 304.093 172.722 298.435C183.443 292.777 193.27 286.821 194.759 285.332C199.226 281.46 205.479 282.056 205.479 286.523C205.479 291.585 180.167 326.13 175.104 328.214C170.042 330.299 180.465 339.233 187.909 339.233C190.59 339.233 201.013 330.895 210.84 320.769C224.538 306.773 229.899 302.902 232.579 305.582C237.939 310.942 232.877 320.769 213.818 340.126C197.439 356.803 196.546 358.59 201.31 362.163C212.031 369.906 219.774 366.928 233.175 349.656C245.384 333.575 254.616 329.108 257.892 337.446C259.976 342.509 257.296 346.082 236.152 368.417C218.88 386.285 217.987 388.369 225.134 391.049C234.961 394.921 240.024 392.241 256.7 375.862C272.781 360.079 274.27 359.185 279.035 363.652C283.502 368.417 282.906 369.906 270.995 385.689C263.55 394.921 254.616 404.45 251.042 406.833C243.3 412.193 245.682 417.851 256.998 420.829C262.061 422.02 266.826 419.042 279.333 405.939C300.179 383.902 303.752 385.391 303.454 415.767C303.454 428.572 302.561 441.079 301.37 443.759C299.285 448.822 283.502 469.072 270.995 482.473C262.656 491.704 229.005 506.892 217.391 506.892C213.222 506.892 199.821 500.638 187.314 493.194C174.806 485.749 162.001 479.197 159.023 478.602C154.556 478.006 152.472 472.348 148.6 450.906C145.92 436.017 142.644 416.66 141.751 407.428C139.369 387.774 132.817 376.755 128.052 383.902C126.563 386.285 125.074 391.645 125.074 395.516C125.074 402.366 122.394 414.278 111.376 455.373C104.527 481.282 104.824 486.344 112.269 487.535C116.141 488.131 122.096 486.344 125.67 483.962C135.2 477.112 139.071 478.006 143.538 487.238C145.622 492.002 162.001 506.594 179.571 519.995L211.435 544.117L232.281 542.926C243.597 542.33 257.892 539.65 263.848 537.267C269.803 534.885 276.355 532.8 278.737 532.8C287.076 532.8 310.602 513.444 326.98 493.491C360.036 452.693 357.653 459.245 356.76 413.682C356.164 391.645 354.675 371.395 353.484 368.715C349.613 360.972 359.142 354.123 373.139 353.825C392.793 353.229 400.238 350.251 403.514 341.02C407.088 330.895 401.727 326.725 390.411 330.299C374.33 335.362 351.995 336.255 348.422 331.788C341.87 323.747 347.23 319.281 366.289 317.196C390.709 314.218 393.091 313.325 393.091 303.2C393.091 293.372 392.496 293.372 363.907 297.541C341.572 300.519 335.914 299.03 337.105 290.394C337.999 285.034 340.679 283.843 358.547 282.354C379.69 280.567 388.624 274.909 386.242 264.784C385.646 261.21 382.37 260.615 370.756 261.508C337.701 264.784 326.385 263.593 325.194 257.637C323.705 249.894 329.661 246.916 347.826 246.916C368.076 246.916 375.223 243.045 375.223 232.324V223.986L344.848 225.475L314.175 226.666L325.491 218.923C337.701 210.585 357.951 199.269 407.981 173.063C472.007 139.709 482.43 133.158 482.43 126.904C482.43 125.117 470.816 111.717 456.522 96.8267C441.93 81.9369 420.191 58.411 407.981 45.0102C395.771 31.3116 382.966 17.0173 379.392 13.4438C372.245 5.10547 362.418 -0.552656 356.76 0.0429363C354.675 0.340733 344.848 1.82973 335.021 3.31871Z"
                fill={fillColor} // Dynamic fill color
              />
            </svg>
          </div>
        </div>
      </button>
      <div className='backgroundImage h-full w-full top-0 left-0 flex absolute justify-center items-center -z-10 opacity-10'>
        <div className='w-1/2'>
        <Image
          src="https://cdn.sanity.io/images/m5ok1ygs/production/991766b39f196b747c35901117a8fe02832ad5a4-2007x1768.png"
          width={1000}
          height={1000}
          className="w-full"
        />
        </div>  
      
      </div>
    </div>
  );
};

export default CustomButton;
