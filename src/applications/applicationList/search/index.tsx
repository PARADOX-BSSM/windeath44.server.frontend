import * as _ from "@/applications/applicationList/search/style.ts";
import Folder from "@/assets/search/folder.svg"
import Search_task from "@/applications/applicationList/search/search_task";

const Search = () => {

    return (
        <_.main>
            <_.main_serve>
            <_.search_task>
                <Search_task/>
                <_.view>
                    <div>개체 맵 돌려야함</div>
                </_.view>
            </_.search_task>
            <_.object>
                <img src={Folder}/>
                <div>3 개체</div>
            </_.object>
            </_.main_serve>
        </_.main>
    );
}
export default Search;