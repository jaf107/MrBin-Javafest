import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getProducts } from "../../redux/actions/productActions";
import "./Search.css";
export default function Search() {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState("");
  const onKeywordChange = (e) => {
    setKeyword(e.target.value);
  };
  const onSearch = (e) => {
    e.preventDefault();
    navigate(`/marketplace/${keyword}`);
  };
  return (
    <div>
      <div class="col-md-12 mt-3 flex ">
        <div class="">
          <input
            type="search"
            id="form1"
            name="keyword"
            value={keyword}
            class="form-control rounded_edge search_bar shadow-sm"
            placeholder="Search a Product"
            onChange={onKeywordChange}
          />
        </div>
        <button
          type="button"
          class="btn search_button btn-info "
          onClick={onSearch}
        >
          <i class="fas fa-search"></i>
        </button>
      </div>
    </div>
  );
}
