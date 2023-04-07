import {withIronSessionApiRoute} from "iron-session/next";
import {sessionOptions} from "@/lib/session";

export default withIronSessionApiRoute(
    async function loginRoute(req, res) {

        const {walletAddress, signature} = req.body; // extract the wallet address and signature from the request body

        const options = {method: 'GET', headers: {accept: 'application/json'}};

        try {
            // validate the signature
            const signatureValidationResponse = await fetch(`https://app.whal3s.xyz/api/v0/signature-messages?utility_id=${process.env.WHAL3S_UTILITY_ID}&wallet_address=${walletAddress}&signature=${signature}`, options)
            if (signatureValidationResponse.status !== 200)
                throw 'Invalid signature'

            // validate the wallet address, check if wallet matched utility conditions
            const eligibilityResponse = await fetch(`https://app.whal3s.xyz/api/v0/nft-validation-utilities/${process.env.WHAL3S_UTILITY_ID}/wallet/${walletAddress}`)
            const eligibilityResponseJson = await eligibilityResponse.json()

            if (eligibilityResponse.status !== 200 || !eligibilityResponseJson.valid)
                throw 'Wallet not eligible'

            // if the signature and wallet address are valid, create a user object and save it to the session
            const user = {
                isLoggedIn: true,
                walletAddress: walletAddress,
                signature: signature,
            };
            req.session.user = user;
            await req.session.save();
            res.json(user);

        } catch (error){
            // if there is an error, set the user object to an empty object - kill the session
            req.session.user = {
                isLoggedIn: false,
                walletAddress: '',
                signature: '',
            };
            await req.session.save();
            res.status(403).json({message: (error as Error).message});
        }

    },
    sessionOptions
);
