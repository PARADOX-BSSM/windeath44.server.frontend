import * as _ from "@/applications/applicationList/search/style.ts";
import Folder from "@/assets/search/folder.svg"
import Search_task from "@/applications/applicationList/search/search_task";
import Viewer from "@/applications/applicationList/search/viewer";

const Search = () => {

    return (
        <_.main>
            <_.main_serve>
            <_.search_task>
                <Search_task/>
                <Viewer/>
            </_.search_task>
            <_.object>
                <div>
                    <img src={Folder}/>
                    <div>0개체</div>
                </div>
            </_.object>
            </_.main_serve>
        </_.main>
    );
}
export default Search;