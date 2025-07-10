import { filterOptions } from "@/config";
import { Fragment } from "react";
import { Label } from "../ui/label";

export default function PorductFilter(){
    return(
        <div className="bg-background rounded-lg shadow-sm">
            <div className="p-4 border-b">
                <h2 className="text-lg font-extrabold  ">Filters</h2>
            </div>
            <div className="p-4 space-y-4 ">
                {Object.keys(filterOptions).map((keyItem=>(
                    <Fragment>
                        <div>
                            <h3 className="text-base font-bold">{keyItem}</h3>
                            <div className="grid-gap-2 mt-2">
                                {
                                    filterOptions[keyItem].map(option => <Label></Label>)
                                }
                            </div>
                        </div>
                    </Fragment>
                )))}
            </div>
        </div>
    )
}