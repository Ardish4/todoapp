import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { AiOutlineLogin } from 'react-icons/ai'
import { TbFolder } from 'react-icons/tb'
import { FiMoreVertical } from 'react-icons/fi'
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const [todo, setTodo] = useState([]);

  const navigate = useNavigate()
  const [createOpen, setCreateOpen] = useState(false)

  // get todos from backend on component mount
  useEffect(() => {
    axios.get('/api/v1/todo/')
    .then((response) => {
      setTodo(response.data.data)
    })
    .catch((error) => {
      console.error('Error fetching todos:', error)
    })
  }, [todo])

  const handleLogout = () => {
    // TODO: Implement logout functionality here
    axios.post('/api/v1/user/logout')
    .then(() => {
      navigate('/hero');
    })
    .catch((error) => {
      console.error("Logout error:", error);
    });
  }

  const handleCreateTodo = (e) => {
    e.preventDefault();
    axios.post('/api/v1/todo/create', {
      title: e.target.name.value
    })
    .then((response) => {
      console.log('Create response:', response)
    })
    // close create dialog
    setCreateOpen(false)
  }

  const handleLearnMore = () => {
    // navigate to the hero page
    navigate('/hero')
  }

  // returns an onSubmit handler for editing a todo at `index`
  const handleEditSubmit = (index) => (e) => {
    e.preventDefault()
    axios.put(`/api/v1/todo/update/${todo[index]._id}`, {
      title: e.target.name.value
    })
    .then((response) => {
      console.log('Edit response:', response)
    })
    .catch((error) => {
      console.error('Error editing todo:', error)
    })
    // close the edit dialog
    setEditingIndex(-1)
  }

  const handleToggleTodo = (index) => {
    axios.patch(`/api/v1/todo/toggle/${todo[index]._id}`)
    .then((response) => {
      console.log('Toggle response:', response)
    })
    .catch((error) => {
      console.error('Error toggling todo:', error)
    })
  }

  const [editingIndex, setEditingIndex] = useState(-1)

  const handleDeleteTodo = (index) => {
    axios.delete(`/api/v1/todo/delete/${todo[index]._id}`)
    .then((response) => {
      console.log('Delete response:', response)
    })
    .catch((error) => {
      console.error('Error deleting todo:', error)
    })
  }

  return (
    <div className='min-h-screen bg-gray-900 text-white'>
      {/* Navbar */}
      <div className='flex p-4 justify-between items-center'>
        {/* Avatar */}
        <div className='w-8 h-8 bg-indigo-500 rounded-full'>
          <p className='text-white text-center text-xl select-none'>A</p>
        </div>
        {/* Logout */}
        <button onClick={handleLogout} className='hover:box-shadow hover:bg-gray-800 text-white font-semibold p-1 rounded-4xl flex items-center'>
          <AiOutlineLogin color='#625FFF' size={24} className='inline-block' />
        </button>
      </div>
      {/* Main Content */}
      <div className='flex max-h-screen justify-center items-center'>
        {/* Empty State */}
        {todo.length === 0 && (
        <Empty>
          <EmptyHeader>
            <EmptyMedia className="bg-indigo-500" variant="icon">
              <TbFolder color='white' />
            </EmptyMedia>
            <EmptyTitle>No To-Dos Yet</EmptyTitle>
            <EmptyDescription className="text-indigo-300">
              You haven&apos;t created any todos yet. Get started by creating
              your first todo.
            </EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            <div className="flex gap-2">
              <Dialog open={createOpen} onOpenChange={(open) => setCreateOpen(open)}>
                <DialogTrigger asChild>
                  <Button variant="outline" className='bg-indigo-500 border-none hover:bg-indigo-600 hover:text-white' onClick={() => setCreateOpen(true)}>Create ToDo</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px] bg-gray-900 text-white border-none">
                  <form onSubmit={handleCreateTodo}>
                    <DialogHeader>
                      <DialogTitle>Create your first ToDo</DialogTitle>
                      <DialogDescription className="text-indigo-300">
                        Click create when you&apos;re done.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4">
                      <div className="grid gap-3">
                        <Label htmlFor="name-1">Todo</Label>
                        <Input id="name-1" name="name" defaultValue="New Todo" className="border-indigo-300 selection:bg-indigo-500" />
                      </div>
                    </div>
                    <DialogFooter className="mt-4">
                      <DialogClose asChild>
                        <Button variant="outline" className="bg-transparent text-indigo-500 border-indigo-500 hover:bg-transparent hover:border-indigo-600 hover:text-indigo-600">Cancel</Button>
                      </DialogClose>
                      <Button type="submit" className="bg-indigo-500 border-none hover:bg-indigo-600 hover:text-white">Create</Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
              <Button variant="outline" onClick={handleLearnMore} className='bg-transparent text-indigo-500 border-indigo-500 hover:bg-transparent hover:border-indigo-600 hover:text-indigo-600'>Learn More</Button>
            </div>
          </EmptyContent>
        </Empty>
        )}
        {/* ToDo List */}
        <div className={`flex flex-col gap-4 ${todo.length === 0 ? '' : 'min-w-screen'}`}>
          {todo.map((item, index) => (
            // Single ToDo Item
            <div key={index} className="flex justify-between gap-6 mx-4 pl-4 pr-2 py-2 bg-gray-800 rounded-md ">
              <div className="flex items-center gap-3">
                <Checkbox className="" id={`todo-${index}`} checked={item.checked} onCheckedChange={() => handleToggleTodo(index)} />
                <Label htmlFor={`todo-${index}`}>{item.title}</Label>
              </div>
              {/* Dropdown icon button */}
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Button className="bg-transparent border-indigo-500 hover:bg-gray-700" size="icon" aria-label="Submit">
                    <FiMoreVertical />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-gray-700 text-white">
                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => setEditingIndex(index)}>Edit</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleDeleteTodo(index)}>Delete</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ))}
        </div>
      </div>
      {/* Edit Dialog */}
      <Dialog open={editingIndex >= 0} onOpenChange={(open) => { if (!open) setEditingIndex(-1) }}>
        <DialogContent className="sm:max-w-[425px] bg-gray-900 text-white border-none">
          {editingIndex >= 0 && (
            <form onSubmit={handleEditSubmit(editingIndex)}>
              <DialogHeader>
                <DialogTitle>Edit your ToDo</DialogTitle>
                <DialogDescription className="text-indigo-300">
                  Click save when you&apos;re done.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4">
                <div className="grid gap-3">
                  <Label htmlFor={`edit-name-${editingIndex}`}>Todo</Label>
                  <Input id={`edit-name-${editingIndex}`} name="name" defaultValue={todo[editingIndex]?.title || ''} className="border-indigo-300 selection:bg-indigo-500" />
                </div>
              </div>
              <DialogFooter className="mt-4">
                <DialogClose asChild>
                  <Button variant="outline" className="bg-transparent text-indigo-500 border-indigo-500 hover:bg-transparent hover:border-indigo-600 hover:text-indigo-600">Cancel</Button>
                </DialogClose>
                <Button type="submit" className="bg-indigo-500 border-none hover:bg-indigo-600 hover:text-white">Save</Button>
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>
      {/* floating button */}
      {todo.length !== 0 && (
        <div className="fixed bottom-6 right-6">
          <Dialog open={createOpen} onOpenChange={(open) => setCreateOpen(open)}>
            <DialogTrigger asChild>
              <Button variant="outline" className='bg-indigo-500 border-none hover:bg-indigo-600 hover:text-white'>+</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] bg-gray-900 text-white border-none">
              <form onSubmit={handleCreateTodo}>
                <DialogHeader>
                  <DialogTitle>Create your first ToDo</DialogTitle>
                  <DialogDescription className="text-indigo-300">
                    Click create when you&apos;re done.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4">
                  <div className="grid gap-3">
                    <Label htmlFor="name-1">Todo</Label>
                    <Input id="name-1" name="name" defaultValue="New Todo" className="border-indigo-300 selection:bg-indigo-500" />
                  </div>
                </div>
                <DialogFooter className="mt-4">
                  <DialogClose asChild>
                    <Button variant="outline" className="bg-transparent text-indigo-500 border-indigo-500 hover:bg-transparent hover:border-indigo-600 hover:text-indigo-600">Cancel</Button>
                  </DialogClose>
                  <Button type="submit" className="bg-indigo-500 border-none hover:bg-indigo-600 hover:text-white">Create</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      )}
    </div>
  )
}

export default Home
