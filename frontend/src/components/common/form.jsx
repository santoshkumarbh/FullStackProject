import { Label } from "@radix-ui/react-label";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Select } from "../ui/select";
import { Textarea } from "../ui/textarea";



export default function CommonForm({
    formControls,
    formData,
    setFormData,
    onSubmit,
    buttonText,
    isBtnDisabled,
}){

    const types={
        INPUT:"input",
        SELECT:"select",
        TEXTAREA:"textarea",
    }

    function renderInputsByComponentType(getControlItem){
        let element=null;
        const value=formData[getControlItem.name] || "";

        switch(getControlItem.contentType){
            case types.INPUT: 
              element=(
                <Input
                    name={getControlItem.name}
                    placeholder={getControlItem.placeholder}
                    id={getControlItem.name}
                    type={getControlItem.type}
                    value={value}
                    onChange={(e)=>
                        setFormData({
                            ...formData,
                            [getControlItem.name]:e.target.value,
                        })
                    }
                />
            );
            break;
            case types.SELECT: 
                element=(
                    <Select onValueChange={(value)=>setFormData({
                        ...formData,
                        [getControlItem.name]:value
                    })} value={value}>
                        <SelectTrigger>
                            <SelectValue placeholder={getControlItem.placeholder}/>
                        </SelectTrigger>
                        <SelectContent>
                            {
                                getControlItem.options && 
                                getControlItem.options.length>0 ?
                                getControlItem.options.map((optionItem)=>(<SelectItem key={optionItem.id} value={optionItem.id}>{optionItem.label}</SelectItem>)) : null
                            }
                        </SelectContent>
                    </Select>
                )
            break;
            case types.TEXTAREA:
                element=(
                    <Textarea
                        name={getControlItem.name}
                        placeholder={getControlItem.placeholder}
                        id={getControlItem.id}
                        value={value}
                        onChange={(e)=>
                        setFormData({
                            ...formData,
                            [getControlItem.name]:e.target.value,
                        })
                    }
                    />  
                )
            break;
            default:
                element=(
                    <Input
                        name={getControlItem.name}
                        placeholder={getControlItem.placeholder}
                        id={getControlItem.name}
                        type={getControlItem.type}
                        onChange={(e)=>
                        setFormData({
                            ...formData,
                            [getControlItem.name]:e.target.value,
                        })
                    }
                    />  
                )
        }
        return element;
    }

    return(
        <>
            <form onSubmit={onSubmit}>
                <div className="flex flex-col gap-3">
                    {formControls.map((controlItem)=>(
                        <div className="grid w-full gap-1.5" key={controlItem.name}>
                            <Label className="mb-1">{controlItem.label}</Label>
                            {renderInputsByComponentType(controlItem)}
                        </div>
                    ))}
                </div>
                <Button className="mt-2 w-full" disabled={isBtnDisabled} type="submit">
                    {buttonText || "Submit"}
                </Button>
            </form>
        </>
    )
}