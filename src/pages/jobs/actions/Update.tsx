import { Button, DatePicker, Form, Input, Modal, Select } from "antd";
import { useEffect, useState } from "react";
import { useNotification } from "../../../hooks/useNotification";
import { Editor } from "@tinymce/tinymce-react";
import { useNavigate } from "react-router-dom";
import { getJob, updateJob } from "../../../services/jobs";
import { Job_type, JobEntity } from "../../../entities/Job";
import { formatDate } from "../../../utils/formatDate";
import dayjs from "dayjs";

interface EditProps {
  open: boolean;
  onClose: () => void;
  id: number
  setRefreshKey: React.Dispatch<React.SetStateAction<boolean>>
}

const optionsJobType = [
  {
    label: 'Full_time',
    value: 'Full_time'
  },
  {
    label: 'Part_time',
    value: 'Part_time'
  },
  {
    label: 'Intern',
    value: 'Intern'
  },
  {
    label: 'Contract',
    value: 'Contract'
  },
  {
    label: 'Freelancer',
    value: 'Freelancer'
  }
]

interface FormValues {
  job_name: string
  location: string
  date: Date[]
  job_type: Job_type
  salary: string
  job_description: string
  number_of_recruitment: number
}

function Update(props: EditProps) {
  const { open, onClose, id, setRefreshKey } = props;

  const { RangePicker } = DatePicker;

  const [form] = Form.useForm();

  const [content, setContent] = useState('')
  const [data, setData] = useState<JobEntity>()
  const [loading, setLoading] = useState(false)

  const notification = useNotification();
  const navigate = useNavigate();
  useEffect(() => {
    (async() => {
      const res = await getJob(id)
      const data = res.data.data as JobEntity
      setData(res.data.data)
      form.setFieldsValue({
        job_name: data.job_name,
        location: data.location,
        job_type: data.job_type,
        salary: data.salary,
        number_of_recruitment: data.number_of_recruitment,
        description: data.job_description
      });
    })()
  }, [form, id]);
  console.log(data?.time_open, data?.time_close)

  const onFinish = async (data: FormValues) => {
    setLoading(true);
    const submitData = {
      ...data,
      time_open: formatDate(data.date[0]),
      time_close: formatDate(data.date[1]),
      job_description: content,
      number_of_recruitment: parseInt(data.number_of_recruitment.toString()),
    }
    try {
      await updateJob(id, submitData)
      notification.success('Sửa Bản tin thành công')
      onClose();
      setRefreshKey(pre => !pre)
    } catch (err) {
      if (err instanceof Error) {
        if (err.message === "Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.") {
          navigate('/login')
          notification.error(err.message)
        } else {
          notification.error('Sửa Bản tin thất bại')
        }
      }
    } finally {
      setLoading(false);
    }
  }
  if(!data) return;

  return (
    <Modal
      open={open}
      onCancel={onClose}
      className='!p-0 !w-4/6 !top-4'
      footer={false}
    >
      <div className="w-full text-center p-3 h-[60px] leading-[36px] bg-[#24652c] rounded-t-lg uppercase font-bold">Sửa Bản tin</div>
      <div className="p-4">
        <Form form={form} className="flex flex-col gap-6" onFinish={onFinish}>
          <div className="flex items-center h-[40px]">
            <p className="w-[120px] text-left text-[#24652c]">Tên công việc</p>
            <Form.Item
              className="!mb-0 w-full"
              name="job_name"
              rules={[
                {
                  required: true,
                  message: "Trường này là bắt buộc"
                },
              ]}
            >
              <Input className="py-2" />
            </Form.Item>
          </div>
          <div className="flex items-center h-[40px]">
            <p className="w-[120px] text-left text-[#24652c]">Địa điểm</p>
            <Form.Item
              className="!mb-0 w-full"
              name="location"
              rules={[
                {
                  required: true,
                  message: "Trường này là bắt buộc"
                },
              ]}
            >
              <Input className="py-2" />
            </Form.Item>
          </div>
          <div className="flex items-center h-[40px]">
            <p className="w-[120px] text-left text-[#24652c]">Loại công việc</p>
            <Form.Item
              className="!mb-0 w-full"
              name="job_type"
              rules={[
                {
                  required: true,
                  message: "Trường này là bắt buộc"
                },
              ]}
            >
              <Select options={optionsJobType} />
            </Form.Item>
          </div>
          <div className="flex items-center h-[40px]">
            <p className="w-[120px] text-left text-[#24652c]">Mức lương</p>
            <Form.Item
              className="!mb-0 w-full"
              name="salary"
              rules={[
                {
                  required: true,
                  message: "Trường này là bắt buộc"
                },
              ]}
            >
              <Input className="py-2" />
            </Form.Item>
          </div>
          <div className="flex items-center h-[40px]">
            <p className="w-[120px] text-left text-[#24652c]">Thời gian ứng tuyển</p>
            <Form.Item
              className="!mb-0 w-full"
              name="date"
              rules={[
                {
                  required: true,
                  message: "Trường này là bắt buộc"
                },
              ]}
              initialValue={[dayjs(data.time_open, 'DD-MM-YYYY'), dayjs(data.time_close, 'DD-MM-YYYY')]}
            >
              <RangePicker
              />
            </Form.Item>
          </div>
          <div className="flex items-center h-[40px]">
            <p className="w-[120px] text-left text-[#24652c]">Số lượng</p>
            <Form.Item
              className="!mb-0 w-full"
              name="number_of_recruitment"
              rules={[
                {
                  required: true,
                  message: "Trường này là bắt buộc"
                },
              ]}
            >
              <Input className="py-2" />
            </Form.Item>
          </div>
          <div className="flex items-center">
            <p className="w-[106px] text-left text-[#24652c]">Mô tả công việc</p>
            <Editor
              apiKey="hkoepxco9p2gme5kius6axtlk3n83yberu5a59m56l7dhgn3"
              value={content}
              onEditorChange={(newContent) => setContent(newContent)}
              init={{
                height: 300,
                width: 1000,
                menubar: false,
                extended_valid_elements: "iframe[src|frameborder|style|scrolling|class|width|height|name|align]",
                valid_elements: '*[*]',
                plugins: [
                  'advlist autolink lists link image charmap print preview anchor',
                  'searchreplace visualblocks code fullscreen',
                  'insertdatetime media paste code help wordcount textcolor',
                  'table',
                  'media',
                ],
                toolbar:
                  'undo redo | formatselect | bold italic backcolor | ' +
                  'alignleft aligncenter alignright alignjustify | ' +
                  'bullist numlist outdent indent | table | forecolor | removeformat | media',
                setup: (editor) => {
                  editor.on('init', () => {
                    editor.setContent(data?.job_description)
                  })
                }
              }}
            />
          </div>
          <div className="flex justify-evenly">
            <Button type="primary" danger onClick={onClose}>Hủy</Button>
            <Button type="primary" htmlType="submit" loading={loading}>Xác nhận</Button>
          </div>
        </Form>
      </div>
    </Modal>
  )
}

export default Update