import { FC, useState } from "react";
import { Box, Collapse, TextField, Tooltip } from "@mui/material";
import AddIcon from "@mui/icons-material/AddCircleOutline";
import FilterIcon from "@mui/icons-material/FilterListOutlined";
import UpIcon from "@mui/icons-material/ExpandLess";
import DownIcon from "@mui/icons-material/ExpandMore";
import { Order } from "../../types";

interface SearchProps {
  onAddClick: () => void;
  onSearchValueChange: (value: string) => void;
  onOrderChange: (order: Order) => void;
  order: Order;
}

const Search: FC<SearchProps> = ({
  onAddClick,
  order,
  onSearchValueChange,
  onOrderChange,
}) => {
  const [isFilterCollapsed, setIsFilterCollapsed] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  let timer: any;

  const onFilterClick = () => {
    setIsFilterCollapsed(!isFilterCollapsed);
  };

  const onSearchChange = (event: any) => {
    setSearchValue(event.target.value);
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => onSearchValueChange(event.target.value), 1000);
  };

  const onDescOrder = () => {
    onOrderChange(Order.ASC);
  };

  const onAscOrder = () => {
    onOrderChange(Order.DESC);
  };

  return (
    <Box className="flex flex-row items-center m-2 gap-3">
      <Tooltip placement="top" title="New Recipe">
        <AddIcon className="icon-btn" color="primary" onClick={onAddClick} />
      </Tooltip>
      <Tooltip placement="top" title="Filter">
        <FilterIcon
          className="icon-btn"
          color="primary"
          onClick={onFilterClick}
        />
      </Tooltip>
      <Collapse orientation="horizontal" in={isFilterCollapsed}>
        <TextField
          inputRef={(input) => input && input.focus()}
          size="small"
          variant="outlined"
          className="w-80"
          placeholder="by name"
          autoComplete="off"
          onChange={onSearchChange}
          value={searchValue}
        />
      </Collapse>
      {order === Order.ASC && (
        <Tooltip title="sort by created date asc" placement="top">
          <UpIcon color="primary" className="icon-btn" onClick={onAscOrder} />
        </Tooltip>
      )}
      {order === Order.DESC && (
        <Tooltip title="sort by created date desc" placement="top">
          <DownIcon
            color="primary"
            className="icon-btn"
            onClick={onDescOrder}
          />
        </Tooltip>
      )}
    </Box>
  );
};

export default Search;
