import React, { useState } from 'react'
import { AiOutlineLogin } from 'react-icons/ai'
import { TbFolder } from 'react-icons/tb'
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
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const Home = () => {
  const [todo, setTodo] = useState([{}]);
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
                <form>
                  <DialogTrigger asChild>
                    <Button variant="outline" className='bg-indigo-500 border-none hover:bg-indigo-600 hover:text-white'>Open Dialog</Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]  bg-gray-900 text-white border-none">
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
                    <DialogFooter>
                      <DialogClose asChild>
                        <Button variant="outline" className="bg-transparent text-indigo-500 border-indigo-500 hover:bg-transparent hover:border-indigo-600 hover:text-indigo-600">Cancel</Button>
                      </DialogClose>
                      <Button type="submit" className="bg-indigo-500 border-none hover:bg-indigo-600 hover:text-white">Create</Button>
                    </DialogFooter>
                  </DialogContent>
                </form>
              </Dialog>
              <Button variant="outline" className='bg-transparent text-indigo-500 border-indigo-500 hover:bg-transparent hover:border-indigo-600 hover:text-indigo-600'>Learn More</Button>
            </div>
          </EmptyContent>
        </Empty>
        )}
      </div>
    </div>
  )
}

export default Home
