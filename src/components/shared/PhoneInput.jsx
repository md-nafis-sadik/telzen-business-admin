import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

function PhoneInputComponent({
  label,
  labelClass,
  placeholder = "Enter number",
  name = "phone",
  value,
  onChange,
  country = "bd",
  required = false,
}) {
  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label className={labelClass || "text-sm font-medium text-gray-700"}>
          {label}
        </label>
      )}
      <PhoneInput
        country={country}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        inputProps={{
          name: name,
          required: required,
        }}
        inputStyle={{
          width: "100%",
          height: "50px",
          paddingLeft: "50px",
          borderRadius: "8px",
          borderColor: "#BDBDBD",
          fontSize: "15px",
          color: "#4f4f4f",
        }}
        buttonStyle={{
          border: "none",
          background: "transparent",
          borderRadius: "50%",
          marginLeft: "10px",
          boxShadow: "none",
          padding: "0px 0px 0px 0px",
        }}
        containerStyle={{ width: "100%" }}
      />
    </div>
  );
}

export default PhoneInputComponent;
