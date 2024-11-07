import { Button, Modal } from "antd";
import { useState } from "react";
import { useNotification } from "../../../hooks/useNotification";
import { useNavigate } from "react-router-dom";
import { deleteJob } from "../../../services/jobs";

interface DeleteProductProps {
  open: boolean;
  onCancel: () => void;
  id: number;
  setRefreshKey: React.Dispatch<React.SetStateAction<boolean>>
}

function Delete(props: DeleteProductProps) {
  const { open, onCancel, id, setRefreshKey } = props

  const [loading, setLoading] = useState(false);

  const notification = useNotification();
  const navigate = useNavigate()

  const onSubmit = async () => {
    setLoading(true);
    try {
      await deleteJob(id)
      notification.success('Xóa Việc làm thành công')
      onCancel();
      setRefreshKey(pre => !pre)
    } catch (err) {
      if (err instanceof Error) {
        console.log(err.message)
        if (err.message === "Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.") {
          navigate('/login')
          notification.error(err.message)
        } else {
          notification.error('Xóa Việc làm thất bại')
        }
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <Modal
      open={open}
      className='!p-0 !w-1/2'
      onCancel={onCancel}
      footer={false}
      wrapClassName='!p-0'
    >
      <div className="w-full text-center p-3 h-[60px] leading-[36px] bg-[#24652c] rounded-t-lg uppercase font-bold">{`Bạn muốn xóa Bản tin này không`}</div>
      <div className="flex justify-center gap-12 p-4">
        <Button type="primary" danger onClick={onCancel}>Hủy</Button>
        <Button type="primary" onClick={onSubmit} loading={loading}>Xác nhận</Button>
      </div>
    </Modal>
  )
}

export default Delete