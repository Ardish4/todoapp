import React, { useState } from 'react'
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

  const handleLogout = () => {
    // TODO: Implement logout functionality here
    navigate('/login')
  }

  const handleCreateTodo = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newTodo = formData.get('name');
    if (!newTodo) return;
    setTodo((prev) => [...prev, { name: newTodo, checked: false }]);
    console.log('Creating todo:', newTodo);
    e.target.reset();
  }

  const handleLearnMore = () => {
    // navigate to the hero page
    navigate('/hero')
  }

  // returns an onSubmit handler for editing a todo at `index`
  const handleEditSubmit = (index) => (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const newTodo = formData.get('name') || ''
    if (!newTodo) return
    setTodo((prev) => {
      const updated = [...prev]
      const prevItem = updated[index] || { name: '', checked: false }
      updated[index] = { ...prevItem, name: newTodo }
      return updated
    })
    // close the edit dialog
    setEditingIndex(-1)
  }

  const handleToggleTodo = (index) => {
    setTodo((prev) => {
      const updated = [...prev]
      updated[index].checked = !updated[index].checked
      return updated
    })
  }

  const [editingIndex, setEditingIndex] = useState(-1)

  const handleDeleteTodo = (index) => {
    setTodo((prev) => prev.filter((_, i) => i !== index))
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
        <button className='hover:box-shadow hover:bg-gray-800 text-white font-semibold p-1 rounded-4xl flex items-center'>
          <AiOutlineLogin color='#625FFF' size={24} className='inline-block' />
        </button>
      </div>
      <div className='flex max-h-screen justify-center items-center'>
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
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" className='bg-indigo-500 border-none hover:bg-indigo-600 hover:text-white'>Create ToDo</Button>
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
        <div className={`flex flex-col gap-4 ${todo.length === 0 ? '' : 'min-w-screen'}`}>
          {todo.map((item, index) => (
            <div key={index} className="flex justify-between gap-6 mx-4 pl-4 pr-2 py-2 bg-gray-800 rounded-md ">
              <div className="flex items-center gap-3">
                <Checkbox id={`todo-${index}`} checked={item.checked} onCheckedChange={() => handleToggleTodo(index)} />
                <Label htmlFor={`todo-${index}`}>{item.name}</Label>
              </div>
              
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Button className="bg-transparent border-indigo-500 hover:bg-gray-700" size="icon" aria-label="Submit">
                    <FiMoreVertical />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-gray-700 text-white">
                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {/* Edit action opens its own dialog */}
                  <DropdownMenuItem onClick={() => setEditingIndex(index)}>Edit</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleDeleteTodo(index)}>Delete</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ))}
        </div>
      </div>
      {/* Controlled edit dialog so it doesn't close immediately when the dropdown closes */}
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
                  <Input id={`edit-name-${editingIndex}`} name="name" defaultValue={todo[editingIndex]?.name || ''} className="border-indigo-300 selection:bg-indigo-500" />
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
      <div className="fixed bottom-6 right-6">
        <Dialog>
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
    </div>
  )
}

export default Home
