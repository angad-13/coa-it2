function convertToIEEE() {
    let decimal = parseFloat(document.getElementById("decimalInput").value);
    if (isNaN(decimal)) {
        alert("Please enter a valid decimal number!");
        return;
    }

    let sign = (decimal < 0) ? 1 : 0;
    decimal = Math.abs(decimal);

    // Convert to binary
    let integerPart = Math.floor(decimal).toString(2);
    let fractionPart = "";
    let frac = decimal - Math.floor(decimal);

    while (fractionPart.length < 52 && frac !== 0) {
        frac *= 2;
        if (frac >= 1) {
            fractionPart += "1";
            frac -= 1;
        } else {
            fractionPart += "0";
        }
    }

    let binary = integerPart + "." + fractionPart;
    
    // Normalize the binary
    let exponent = integerPart.length - 1;
    let normalizedBinary = "1." + binary.slice(1).replace(".", "");
    
    // Calculate IEEE 754 exponent
    let ieeeExponent = exponent + 1023;
    let exponentBinary = ieeeExponent.toString(2).padStart(11, "0");
    
    // Extract Mantissa (52 bits)
    let mantissa = normalizedBinary.slice(2, 54).padEnd(52, "0");

    // Combine IEEE 754 parts
    let ieeeBinary = sign + " " + exponentBinary + " " + mantissa;

    // Convert to Hexadecimal
    let ieeeHex = parseInt(ieeeBinary.replace(/ /g, ""), 2).toString(16).toUpperCase().padStart(16, "0");

    // Update UI
    document.getElementById("sign").innerText = sign;
    document.getElementById("exponent").innerText = exponentBinary;
    document.getElementById("mantissa").innerText = mantissa;
    document.getElementById("ieeeBinary").innerText = ieeeBinary;
    document.getElementById("hexadecimal").innerText = ieeeHex;

    // GSAP Animation
    gsap.from(".result", { opacity: 0, y: 20, duration: 0.5 });
}
