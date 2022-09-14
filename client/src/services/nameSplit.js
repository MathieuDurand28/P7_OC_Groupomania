export default function nameSplit (email) {
    let name = ""

    if (email) {
        const first_conv = email.split("@")
        const second_conv = first_conv[0].split('.')
        name = second_conv[1]
            ? second_conv[0].charAt(0).toUpperCase()+second_conv[0].slice(1)
                + " "+
                second_conv[1].charAt(0).toUpperCase()+second_conv[1].slice(1)
            : first_conv[0]
    }
    return name
}
