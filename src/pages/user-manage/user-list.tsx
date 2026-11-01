import { ColumnDef } from '@tanstack/react-table';
// import { useGetAllUserPaginatedQuery } from "modules/users/api/user.api";
// import { User } from "modules/users/dtos/models/entity";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import { useTypedSelector } from "store";
import UserAvatarCell from './components/user.avatar.cell';
import UserTableAction from './components/user.table.action';
import DashboardLayout from '@/layout/dashboard-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import DataTable from './components/data-tables/datatable';
import { useGetAllUserPaginatedQuery } from '../../../modules/users/api/user.api';
import { User } from '../../../modules/users/dtos/models/entity'
import { useTypedSelector } from '../../../store';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
// import { useTypedSelector } from 'store';

export default function UserPage(){
    const currentUser = useTypedSelector((state) => state.authSlice.user);
    const [userList, setUserList] = useState<User[]>([]);
    const [totalData, setTotalData] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const [searchParams, setSearchParams] = useState('');
    const [sortBy, setSortBy] = useState<string | null>(null);
    const [sortDirection, setSortDirection] = useState<string | null>(null);

    console.log("ini user", userList)
    const queryObject = {
        page: currentPage,
        limit: pageSize,
        search_params: searchParams,
        ...(sortBy && sortDirection && { sort_by: sortBy, sort_direction: sortDirection }),
    };

    const { data, isLoading, refetch } = useGetAllUserPaginatedQuery(
        queryObject,
        {
            skip: false,
            refetchOnMountOrArgChange: true,
        },
    );
    console.log("ini api ",useGetAllUserPaginatedQuery)

    const navigate = useNavigate();
    const handleClick = () => {
        navigate('/users/adduser');
    }

    const fetchData = useCallback(() => {
        if (data?.data) {
            setUserList(data.data);
            setTotalData(data.total || 0 );
        }
    }, [data]);


    useEffect(() => {
        fetchData();
      }, [fetchData]);
    
      

    useEffect(() => {
        refetch();
    }, [currentPage, pageSize, searchParams, sortBy, sortDirection, refetch]);

    const columns: ColumnDef<User>[] = [
    {
      accessorKey: 'name',
      header: 'User',
      cell: (props) => (
        <UserAvatarCell
          id={props.row.original.userId}
          name={props.row.original.name}
        />
    ),
    },
    { accessorKey: 'roles', header: 'Role' },
    { accessorKey: 'username', header: 'Username' },
    {
      accessorKey: 'actions', // Kolom untuk tindakan (Edit & Delete)
      header: 'Actions',
      cell: (props) => (
        <UserTableAction
          user={props.row.original}
          current_role={currentUser?.roles}
        />
    ),
    },
];

return(
    <DashboardLayout>
     <div className='py-12'>
      <Card>
       <CardHeader className='mx-5 mt-5'>
        <CardTitle className='flex justify-between'>
         User List
          {currentUser?.roles === "ADMIN" && (
           <TooltipProvider>
            <Tooltip>
             <TooltipTrigger asChild>
                <Button 
                onClick= {handleClick}
                className="cursor-pointer hover:text-blue-500 transition-colors duration-300"
                >
                <Plus/> Add Users
                </Button>
             </TooltipTrigger>
             <TooltipContent>
              <p>Add User</p>
             </TooltipContent>
            </Tooltip>
           </TooltipProvider>
                )}
        </CardTitle>
       </CardHeader>
      <CardContent>
        <DataTable   
         columns={columns}
         data={userList} // Pass fetched user data
         isLoading={isLoading} // Show loading state
         currentPage={currentPage}
         pageCount={Math.ceil(totalData / pageSize)} // Calculate page count from totalData and pageSize
         pageSize={pageSize}
         totalData={totalData} // Pass total number of entries
         onPageSizeChange={setPageSize} // Handler for changing page size
         onPaginate={setCurrentPage} // Handler for changing current page
         onSearchChange={setSearchParams} // Handler for changing search query
         onSortChange={(sortBy, sortDirection) => {
         setSortBy(sortBy);
         setSortDirection(sortDirection);
         }} // Sorting is only applied when header is clicked
         options={{
         enableGlobalFilter: true,
         }}
        />
      </CardContent>
      </Card>
     </div>
    </DashboardLayout>
)

}