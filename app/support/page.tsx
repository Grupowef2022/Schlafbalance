"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CheckCircle, HelpCircle, Send, ArrowLeft } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { MobileLayout } from "@/components/mobile-layout"
import { useRouter } from "next/navigation"
import { AuthGuard } from "@/components/auth-guard"

export default function SupportPage() {
  const router = useRouter()
  const [category, setCategory] = useState("")
  const [subject, setSubject] = useState("")
  const [message, setMessage] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)
      setCategory("")
      setSubject("")
      setMessage("")
    }, 1500)
  }

  return (
    <AuthGuard>
      <MobileLayout>
        <div className="px-4 pt-6">
          {/* Header com botão de voltar */}
          <div className="flex items-center mb-6">
            <Button variant="ghost" size="icon" onClick={() => router.back()} className="mr-2">
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="text-center flex-1">
              <h1 className="text-2xl font-bold text-slate-700 font-rounded">Kundenservice</h1>
              <p className="text-slate-600 font-rounded">Wir sind hier, um Ihnen zu helfen</p>
            </div>
          </div>

          {isSubmitted ? (
            <Alert className="mb-6 border-0 bg-gradient-to-r from-green-50 to-emerald-50 shadow-xl rounded-3xl">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <AlertTitle className="text-green-800 font-rounded">Nachricht gesendet</AlertTitle>
              <AlertDescription className="text-green-700 font-rounded">
                Vielen Dank für Ihre Nachricht. Unser Team wird sich so schnell wie möglich bei Ihnen melden.
              </AlertDescription>
              <Button
                className="mt-4 bg-green-600 hover:bg-green-700 rounded-2xl font-rounded"
                onClick={() => setIsSubmitted(false)}
              >
                Neue Anfrage
              </Button>
            </Alert>
          ) : (
            <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm rounded-3xl mb-6">
              <form onSubmit={handleSubmit}>
                <CardHeader>
                  <CardTitle className="font-rounded text-slate-700">Support-Anfrage</CardTitle>
                  <CardDescription className="font-rounded">
                    Füllen Sie das Formular aus, um eine Anfrage zu stellen
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="category" className="font-rounded">
                      Kategorie
                    </Label>
                    <Select value={category} onValueChange={setCategory} required>
                      <SelectTrigger id="category" className="rounded-xl">
                        <SelectValue placeholder="Kategorie auswählen" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="routine">Schlafroutine</SelectItem>
                        <SelectItem value="account">Konto & Zugang</SelectItem>
                        <SelectItem value="audio">Audio & Musik</SelectItem>
                        <SelectItem value="general">Allgemeine Fragen</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject" className="font-rounded">
                      Betreff
                    </Label>
                    <Input
                      id="subject"
                      placeholder="Kurzer Betreff Ihrer Anfrage"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="rounded-xl"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message" className="font-rounded">
                      Nachricht
                    </Label>
                    <Textarea
                      id="message"
                      placeholder="Beschreiben Sie Ihr Anliegen im Detail"
                      rows={5}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="rounded-xl"
                      required
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    type="submit"
                    className="w-full h-12 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 rounded-2xl font-rounded"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      "Wird gesendet..."
                    ) : (
                      <>
                        <Send className="mr-2 h-4 w-4" />
                        Anfrage senden
                      </>
                    )}
                  </Button>
                </CardFooter>
              </form>
            </Card>
          )}

          {/* FAQ Section */}
          <div className="space-y-4 pb-6">
            <h2 className="text-xl font-semibold text-slate-700 font-rounded">Häufig gestellte Fragen</h2>

            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm rounded-3xl">
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center font-rounded">
                  <HelpCircle className="h-5 w-5 mr-2 text-purple-600" />
                  Wie lange dauert es, bis ich Ergebnisse sehe?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 font-rounded">
                  Die meisten Eltern berichten von ersten Verbesserungen nach 3-5 Tagen konsequenter Anwendung der
                  Schlafroutine.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm rounded-3xl">
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center font-rounded">
                  <HelpCircle className="h-5 w-5 mr-2 text-purple-600" />
                  Kann ich die Routine an mein Baby anpassen?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 font-rounded">
                  Ja, die Routine ist flexibel gestaltet. Sie können die Dauer der einzelnen Schritte anpassen.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </MobileLayout>
    </AuthGuard>
  )
}
