module.exports = {
  purge: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  mode: "jit",
  darkMode: "media", // 'media' or 'class'
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        xs: "310px",
      },
      width: {
        1: "50px",
        2: "60px",
        3: "70px",
        4: "80px",
        5: "90px",
        10: "110px",
        per_1: "10%",
        per_16: "16%",
        per_2: "20%",
        per_3: "30%",
        per_4: "40%",
        per_5: "50%",
        per_6: "60%",
        per_7: "70%",
        per_8: "80%",
        per_9: "90%",
        per_98: "98%",
        per_10: "100%",
      },
      height: {
        0: "1px",
        init: "42.5px",
        1: "50px",
        2: "60px",
        3: "70px",
        4: "80px",
        5: "900px",
        7: "100px",
        per_1: "10%",
        per_2: "20%",
        per_3: "30%",
        per_4: "40%",
        per_5: "50%",
        per_6: "60%",
        per_7: "70%",
        per_8: "80%",
        per_86: "86%",
        per_9: "90%",
        per_10: "100%",
      },
      borderWidth: {
        1: "1px",
        2: "2px",
        3: "3px",
        4: "4px",
        6: "6px",
        8: "8px",
      },
      colors: {
        transparent: "transparent",
        green: "#2bd891",
        deep_green: "#28a745",
        light_green: "#f2fef2",
        deep_cyan: "#0cc5b7",
        white: "#ffffff",
        gray: "#eff7fa",
        black1: "#000",
        black2: "#333",
        black3: "#666",
        black4: "#888",
        orangee: "#ff934b",
        orangee_red: "#ff5e62",
        info_color: "#0cc5b7",
        light_info_color: "#0ccfdd",
        light_red: "#fff1f0",
        deep_dark: "#c4bedd",
        light_blue: "#24a3b5",
        page_white: "#fef6d4",
        bg_blue: "#eff7fa",
        off_white: "#e7dee0",
      },
      spacing: {
        1: "2px",
        2: "5px",
        3: "8px",
        4: "10px",
        5: "12px",
        6: "15px",
        7: "18px",
        8: "20px",
        9: "22px",
        10: "25px",
        11: "28px",
        12: "30px",
        13: "35px",
        14: "40px",
        15: "45px",
        16: "50px",
        per_1: "2%",
        per_2: "5%",
        per_3: "8%",
        per_4: "10%",
        per_5: "12%",
        per_6: "15%",
        per_7: "18%",
        per_8: "20%",
        per_9: "30%",
        per_10: "50%",
      },
      padding: {
        extra_padding1: "2px",
        extra_padding2: "4px",
        extra_padding: "5px",
        extra_padding3: "6px",
        extra_padding4: "8px",
        1: "10px",
        1.1: "11px",
        1.2: "12px",
        1.5: "15px",
        1.9: "19px",
        2: "20px",
        2.5: "29px",
        3: "30px",
        4: "40px",
        5: "50px",
        6: "60px",
        7: "70px",
        8: "80px",
        9: "90px",
        10: "100px",
        per_1: "10%",
        per_2: "20%",
        per_3: "30%",
        per_4: "40%",
        per_5: "50%",
        per_6: "60%",
        per_7: "70%",
        per_8: "80%",
        per_9: "90%",
        per_10: "100%",
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
      fontSize: {
        thin: "12px",
        light: "15px",
        normal: "17px",
        semi_medium: "20px",
        medium: "25px",
        medium_light: "30px",
        big: "40px",
        big_ultra: "50px",
      },
      fontWeight: {
        extra_thin: 100,
        thin: 200,
        light: 300,
        normal: 400,
        medium: 500,
        semi_bold: 600,
        bold: 700,
        extra_bold: 800,
        black_bold: 900,
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
