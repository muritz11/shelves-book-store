import { Button } from "@chakra-ui/react";
import { IoChevronBackOutline, IoChevronForwardOutline } from "react-icons/io5";
import "../assets/styles/Utils.css";

interface PaginationProps {
  limit: number;
  curPage: number | string;
  totalItems: number;
  paginate: (num: number) => void;
}

const Pagination = ({
  limit,
  curPage,
  totalItems,
  paginate,
}: PaginationProps) => {
  const pageNumbers = [];
  const totalPage = Math.ceil(totalItems / limit);

  for (let i = 1; i <= totalPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="paginationContainer">
      <ul className="pagination">
        <li className="page-item">
          <Button
            variant={"ghost"}
            onClick={() => paginate(Number(curPage) - 1)}
            isDisabled={Number(curPage) === 1}
            size={"sm"}
          >
            <IoChevronBackOutline />
          </Button>
        </li>
        {pageNumbers?.map((pg) => (
          <li key={"pg-" + pg} className="page-item">
            <Button
              colorScheme={"buttonPrimary"}
              variant={Number(curPage) === pg ? "solid" : "ghost"}
              onClick={() => paginate(pg)}
              size={"sm"}
              fontWeight={400}
            >
              {pg}
            </Button>
          </li>
        ))}
        <li className="page-item">
          <Button
            variant={"ghost"}
            onClick={() => paginate(Number(curPage) + 1)}
            isDisabled={Number(curPage) >= totalPage}
            size={"sm"}
          >
            <IoChevronForwardOutline />
          </Button>
        </li>
      </ul>
    </div>
  );
};

export default Pagination;
