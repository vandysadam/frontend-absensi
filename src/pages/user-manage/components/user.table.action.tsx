import { FC, useEffect } from 'react';
import { RoleType, User } from '../../../../modules/users/dtos/models/entity';

import { Pencil, Trash2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../../../components/ui/tooltip';
// import QRCodeModal from '../user-qrcode';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { useDeleteUserMutation } from '../../../../modules/users/api/user.api';
import { toast } from 'react-toastify';

interface UserAvatarCellProps {
  user: User;
  current_role: RoleType | undefined;
}
  


const UserTableAction: FC<UserAvatarCellProps> = ({
  user,
  current_role,
}: UserAvatarCellProps) => {
  
  // const [isQRModalOpen, setIsQRModalOpen] = useState(false);
  // const handleOpenQRModal = () => {
  //   setIsQRModalOpen(true);
  // };
  const navigate = useNavigate();
  const [handleDelete] = useDeleteUserMutation();

  const handleDeleteUser = async () => {
    try {
      await handleDelete({ userId: user.userId }).unwrap();
      
      sessionStorage.setItem('deleteUserSuccess', `User ${user.username} berhasil dihapus.`);

      
      navigate(0);
     
      
    } catch (error) {
      console.error('Error deleting user:', error);
      alert('Gagal menghapus user.');
    }
  };

  useEffect(() => {
    const successMessage = sessionStorage.getItem('deleteUserSuccess');
    
    if (successMessage) {
      toast.success(successMessage); 
      sessionStorage.removeItem('deleteUserSuccess'); 
    }
  }, []);


  // const handleCloseQRModal = () => {
  //   setIsQRModalOpen(false);
  // };
  
  return (
    <div className="flex space-x-2">
      {current_role === 'ADMIN' && (
        <>

        
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  className="text-blue-500 hover:underline"
                  to={`/users/edit/${user.userId}`}
                >
                  <Pencil size="17" className="inline mr-1" />
                </Link>
              </TooltipTrigger>
              <TooltipContent>
                <p>Edit User</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>



          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
             
                
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                  <button
                  className="text-red-500 hover:underline"
                  // onClick={() => handleDelete(user_id)}
                >
                  <Trash2 size="17" className="inline mr-1" />
                </button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Apakah anda yakin akan menghapus {user.username}?</AlertDialogTitle>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={handleDeleteUser}>Delete</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>

              </TooltipTrigger>
              <TooltipContent>
                <p>Delete User</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>



          {/* <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  className="text-black-500 hover:underline"
                  onClick={handleOpenQRModal}>
                  <QrCode size="17" className="inline mr-1" />
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Qr Code User</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider> */}
        </>
      )}



      {/* {current_role === 'FINANCE' && (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                className="text-blue-500 hover:underline"
                to={`/users/topup/${user.userId}`}
              >
                <CircleDollarSign size="17" className="inline mr-1" />
              </Link>
            </TooltipTrigger>
            <TooltipContent>
              <p>Top Up Wallet User</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        )} */}


{/* 
        <QRCodeModal
        walletId={user.wallet?.id || ''}
        isOpen={isQRModalOpen}
        onClose={handleCloseQRModal} 
        username={user.name}
        houseNumber={String(user.house_number) || ''}/> */}
    </div>
  );
};

export default UserTableAction;
