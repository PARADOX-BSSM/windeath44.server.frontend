import * as _ from "@/applications/applicationList/bow/style.ts";
import Table from "@/assets/bow/table.svg";
import Character from "@/assets/character/hosino.svg";

const Bow = () => {
    return(
        <_.main>
            <_.nbow>
                <div>절하고 간 사람</div>
                <div>: {1010}명</div>
            </_.nbow>
            <_.place>
                <_.imgs>
                    <_.character src={Character} alt={"캐릭터"}/>
                    <_.table src={Table} alt={"테이블"}/>
                </_.imgs>
                <_.bbow>
                        <div>
                            <div>
                                <div>
                                    <button>절</button>
                                </div>
                            </div>
                        </div>
                </_.bbow>
            </_.place>
        </_.main>
    )
}
export default Bow;