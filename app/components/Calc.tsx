"use client"

import React from 'react'
import {
  Card, CardContent, CardDescription,
  CardHeader, CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog, DialogContent, DialogDescription,
  DialogHeader, DialogTitle,
} from "@/components/ui/dialog"
import { Loader2 } from 'lucide-react'

export default function Calc() {
  interface Marks {
    cg: number;
    outOf: number;
    credit: number;
  }

  const [marks, setMarks] = React.useState<Marks[]>([])
  const [cg, setCg] = React.useState<number>()
  const [outOf, setOutOf] = React.useState<number>()
  const [credit, setCredit] = React.useState<number>()
  const [loading, setLoading] = React.useState(false)
  const [showDialog, setShowDialog] = React.useState(false)

  const handleSubmit = () => {
    if (cg == null || outOf == null || credit == null) return;

    setMarks((prevMarks) => [...prevMarks, { cg, outOf, credit }])

    setCg(undefined)
    setOutOf(undefined)
    setCredit(undefined)
  }

  const handleMarkChange = (index: number, key: keyof Marks, value: number) => {
    const updatedMarks = [...marks]
    updatedMarks[index][key] = value
    setMarks(updatedMarks)
  }

  const handleFinalSubmit = () => {
    setLoading(true)
    setShowDialog(true)
    setTimeout(() => {
      setLoading(false)
    }, 1000)
  }

  const totalCredits = marks.reduce((acc, mark) => acc + mark.credit, 0)
  const weightedTotal = marks.reduce((acc, mark) => acc + (mark.cg / mark.outOf) * mark.credit, 0)
  const sg = totalCredits > 0 ? (weightedTotal / totalCredits) * 10 : 0

  return (
    <div className='flex items-center justify-center h-full min-h-screen'>
      <Card className="">
        <CardHeader>
          <CardTitle className='text-center'>The SG Walle</CardTitle>
          <CardDescription className='text-center'>Calculate your SG easily</CardDescription>
        </CardHeader>

        <CardContent>
          <div className="grid w-full items-center gap-4">
            {/* Editable list of added marks */}
            {marks.map((mark, index) => (
              <div className="flex flex-row items-center space-x-1.5" key={index}>
                <Label className='w-1/6'>Subject {index + 1}</Label>
                <Input
                  type="number"
                  className='w-1/4'
                  value={mark.cg}
                  onChange={(e) => handleMarkChange(index, 'cg', Number(e.target.value))}
                />
                <Input
                  type="number"
                  className='w-1/4'
                  value={mark.outOf}
                  onChange={(e) => handleMarkChange(index, 'outOf', Number(e.target.value))}
                />
                <Input
                  type="number"
                  className='w-1/4'
                  value={mark.credit}
                  onChange={(e) => handleMarkChange(index, 'credit', Number(e.target.value))}
                />
              </div>
            ))}

            {/* New entry row */}
            <div className="flex flex-row space-x-1.5">
              <Label className='w-1/6'>Subject {marks.length + 1}</Label>
              <Input
                type='number'
                placeholder="CGPA"
                className='w-1/4'
                value={cg === undefined ? '' : cg}
                onChange={(e) => setCg(e.target.value === '' ? undefined : Number(e.target.value))}
              />
              <Input
                type='number'
                placeholder="Out of"
                className='w-1/4'
                value={outOf === undefined ? '' : outOf}
                onChange={(e) => setOutOf(e.target.value === '' ? undefined : Number(e.target.value))}
              />
              <Input
                type='number'
                placeholder="Credit"
                className='w-1/4'
                value={credit === undefined ? '' : credit}
                onChange={(e) => setCredit(e.target.value === '' ? undefined : Number(e.target.value))}
              />
            </div>

            <p className='text-center text-xs'>Add the last one before submitting</p>
            <div className="flex justify-end">
       
              <Button onClick={handleSubmit} className='mx-auto'>Add</Button>
            </div>
          </div>
        </CardContent>
        {marks.length > 0 && (
          <>
            <Button
              variant="outline"
              className='bg-gray-950 mx-auto text-white'
              onClick={handleFinalSubmit}
            >
              Submit
            </Button>

            <Dialog open={showDialog} onOpenChange={setShowDialog}>
              <DialogContent className="sm:max-w-[425px]">
                {loading ? (
                  <DialogHeader>
                    <DialogTitle className='text-center'>
                      <Loader2 className="animate-spin mr-2 h-4 w-4 inline" />
                      Calculating...
                    </DialogTitle>
                    <DialogDescription className='text-center'>
                      Please wait while we calculate your SG.
                    </DialogDescription>
                  </DialogHeader>
                ) : (
                  <DialogHeader className='h-[100px]'>
                    <DialogTitle className='text-center'>Your SG</DialogTitle>
                    <DialogDescription className='text-center mt-8'>
                      Your calculated SG is <strong>{sg.toFixed(2)}</strong>
                    </DialogDescription>
                  </DialogHeader>
                )}
                
              </DialogContent>
            </Dialog>   
          </>
        )}
        
      </Card>
    </div>
  )
}
