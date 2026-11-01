import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';
import DashboardLayout from '../../layout/dashboard-layout';

export default function ManageUserPage() {
  return (
    <DashboardLayout>
      <div className="space-y-4">
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Manage User</CardTitle>
            <CardDescription>
              Halaman untuk mengelola user aplikasi.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p>Konten Manage User akan ditampilkan di sini....</p>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
