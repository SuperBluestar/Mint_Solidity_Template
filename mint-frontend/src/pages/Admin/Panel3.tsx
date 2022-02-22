import { useApiWhitelist } from "hooks";
import { useState } from "react";

const Panel3 = () => {
    const [ page, setPage ] = useState<number>(1);
    const [ cntperpage, setCntPerPage ] = useState<number>(2);
    const [ search, setSearch ] = useState<string>("");
    const whitelist = useApiWhitelist(page, cntperpage, search);
    return (
        <div className="flex">
            <div className="">
                <div className="flex">
                    <input type="text"/>
                    <input type="text"/>
                    <input type="text"/>
                </div>
                <div className="flex flex-col">
                { whitelist?.map((user) => {
                    return (
                        <div className="w-full m-1">{ user.walletAddress }</div>
                    )
                }) }
                </div>
            </div>
        </div>
    )
}

export default Panel3;