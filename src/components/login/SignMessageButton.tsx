import React, {useState} from 'react';
import Button from "../Button";
import {NftValidationUtility} from "@whal3s/whal3s.js";
import toast from "react-hot-toast";

type Props = {
    utility: NftValidationUtility
}
const SignMessageButton = ({utility}: Props) => {
    const [loading, setLoading] = useState(false);
    const sign = () => {
        setLoading(true)
        utility.sign()
            .catch((e: any) => {
                toast.error(e.message)
            })
            .finally(() => {
                setLoading(false)
            })
    }
    return (

        <Button
            isLoading={loading}
            className=""
            onClick={() => {
                sign()
            }}>Sign Message</Button>

    );
};

export default SignMessageButton;
