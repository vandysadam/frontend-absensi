import { Card, CardHeader, CardTitle, CardDescription, CardAction, CardContent, CardFooter } from '@/components/ui/card';
import DashboardLayout from '../../layout/dashboard-layout';
import { Field, FieldGroup, FieldLabel, FieldSet } from '@/components/ui/field';
import { Input } from '@/components/ui/input';


export interface BlogPostProps {}

export default function Dashboard({}: BlogPostProps) {
  return (
    <DashboardLayout>
      <div className="space-y-4">
        <div>
        <Card className="w-full max-w-sm">
            <CardHeader>
                <CardTitle>Created Post Here....</CardTitle>
                {/* <CardDescription>Card Description</CardDescription> */}
                {/* <CardAction>Card Action</CardAction> */}
            </CardHeader>
            <CardContent>
                <form>
                    <FieldGroup>
                        <FieldSet>
                            <Field>
                                <FieldLabel>Title</FieldLabel>
                                <Input  
                                    id="checkout-7j9-card-name-43j"
                                    placeholder="Place Title here...."
                                    required
                                />
                                <Input  
                                    id="checkout-7j9-card-name-43j"
                                    placeholder="Category"
                                    required
                                />    
                            </Field>
                        </FieldSet>
                    </FieldGroup>
                </form>
            </CardContent>
            <CardFooter>
                <p>Card Footer</p>
            </CardFooter>
        </Card>
        </div>


      </div>Main page BlogPost      
    </DashboardLayout>
  );
}
